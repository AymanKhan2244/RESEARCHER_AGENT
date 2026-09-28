########################################################################
# Input Variables
########################################################################

variable "aws_region" {
  description = "AWS region to deploy into"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Short project identifier used in resource names"
  type        = string
  default     = "researcher-agent"
}

variable "environment" {
  description = "Deployment environment (development | staging | production)"
  type        = string
  default     = "development"

  validation {
    condition     = contains(["development", "staging", "production"], var.environment)
    error_message = "environment must be one of: development, staging, production."
  }
}

# -- Network ---------------------------------------------------------

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  description = "CIDR blocks for public subnets (one per AZ)"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
}

variable "private_subnet_cidrs" {
  description = "CIDR blocks for private subnets (one per AZ)"
  type        = list(string)
  default     = ["10.0.11.0/24", "10.0.12.0/24", "10.0.13.0/24"]
}

# -- DNS / TLS --------------------------------------------------------

variable "domain_name" {
  description = "Root domain for ACM certificate (must be managed in Route 53)"
  type        = string
  default     = "researcher-agent.example.com"
}

# -- Ports ------------------------------------------------------------

variable "backend_port" {
  description = "Container port exposed by the FastAPI backend"
  type        = number
  default     = 10000
}

variable "frontend_port" {
  description = "Container port exposed by the Next.js frontend"
  type        = number
  default     = 3000
}

variable "nlb_port" {
  description = "TCP port the NLB listens on for direct backend access"
  type        = number
  default     = 80
}

# -- Container Images -------------------------------------------------

variable "backend_image" {
  description = "Full ECR image URI for the FastAPI backend"
  type        = string
  default     = "123456789012.dkr.ecr.us-east-1.amazonaws.com/researcher-agent-backend:latest"
}

variable "frontend_image" {
  description = "Full ECR image URI for the Next.js frontend"
  type        = string
  default     = "123456789012.dkr.ecr.us-east-1.amazonaws.com/researcher-agent-frontend:latest"
}

# -- ECS Scaling ------------------------------------------------------

variable "backend_desired_count" {
  description = "Desired number of backend ECS tasks"
  type        = number
  default     = 2
}

variable "frontend_desired_count" {
  description = "Desired number of frontend ECS tasks"
  type        = number
  default     = 2
}

# -- Secrets (AWS Secrets Manager ARNs) ------------------------------

variable "groq_api_key_arn" {
  description = "ARN of the Secrets Manager secret holding GROQ_API_KEY"
  type        = string
  sensitive   = true
}

variable "tavily_api_key_arn" {
  description = "ARN of the Secrets Manager secret holding TAVILY_API_KEY"
  type        = string
  sensitive   = true
}

variable "langsmith_api_key_arn" {
  description = "ARN of the Secrets Manager secret holding LANGSMITH_API_KEY"
  type        = string
  sensitive   = true
}
