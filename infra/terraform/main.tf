########################################################################
# ResearcherAIAgent – Root Terraform Configuration
# Provisions: VPC · ECS Fargate · ALB · NLB · ACM · CloudWatch
########################################################################

terraform {
  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.50"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }

  # Uncomment once you have an S3 bucket for remote state:
  # backend "s3" {
  #   bucket         = "researcher-agent-tfstate"
  #   key            = "infra/terraform.tfstate"
  #   region         = "us-east-1"
  #   encrypt        = true
  #   dynamodb_table = "researcher-agent-tf-lock"
  # }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "ResearcherAIAgent"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

########################################################################
# DATA SOURCES
########################################################################

data "aws_availability_zones" "available" {
  state = "available"
}

########################################################################
# MODULES
########################################################################

module "vpc" {
  source = "./modules/vpc"

  project_name    = var.project_name
  environment     = var.environment
  vpc_cidr        = var.vpc_cidr
  azs             = slice(data.aws_availability_zones.available.names, 0, 3)
  public_subnets  = var.public_subnet_cidrs
  private_subnets = var.private_subnet_cidrs
}

module "security_groups" {
  source = "./modules/security_groups"

  project_name = var.project_name
  environment  = var.environment
  vpc_id       = module.vpc.vpc_id
  vpc_cidr     = var.vpc_cidr
}

module "acm" {
  source = "./modules/acm"

  domain_name = var.domain_name
  environment = var.environment
}

module "alb" {
  source = "./modules/alb"

  project_name               = var.project_name
  environment                = var.environment
  vpc_id                     = module.vpc.vpc_id
  public_subnet_ids          = module.vpc.public_subnet_ids
  alb_sg_id                  = module.security_groups.alb_sg_id
  certificate_arn            = module.acm.certificate_arn
  backend_port               = var.backend_port
  frontend_port              = var.frontend_port
  health_check_path          = "/chats"
  enable_deletion_protection = var.environment == "production"
}

module "nlb" {
  source = "./modules/nlb"

  project_name               = var.project_name
  environment                = var.environment
  vpc_id                     = module.vpc.vpc_id
  public_subnet_ids          = module.vpc.public_subnet_ids
  backend_port               = var.backend_port
  nlb_port                   = var.nlb_port
  enable_deletion_protection = var.environment == "production"
}

module "ecs" {
  source = "./modules/ecs"

  project_name           = var.project_name
  environment            = var.environment
  vpc_id                 = module.vpc.vpc_id
  private_subnet_ids     = module.vpc.private_subnet_ids
  ecs_tasks_sg_id        = module.security_groups.ecs_tasks_sg_id
  backend_image          = var.backend_image
  frontend_image         = var.frontend_image
  backend_port           = var.backend_port
  frontend_port          = var.frontend_port
  alb_backend_tg_arn     = module.alb.backend_target_group_arn
  alb_frontend_tg_arn    = module.alb.frontend_target_group_arn
  nlb_backend_tg_arn     = module.nlb.backend_target_group_arn
  backend_desired_count  = var.backend_desired_count
  frontend_desired_count = var.frontend_desired_count
  aws_region             = var.aws_region
  groq_api_key_arn       = var.groq_api_key_arn
  tavily_api_key_arn     = var.tavily_api_key_arn
  langsmith_api_key_arn  = var.langsmith_api_key_arn
}
