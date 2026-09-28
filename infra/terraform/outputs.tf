########################################################################
# Root Outputs
########################################################################

output "alb_dns_name" {
  description = "Public DNS name of the Application Load Balancer"
  value       = module.alb.alb_dns_name
}

output "alb_zone_id" {
  description = "Hosted zone ID of the ALB (for Route 53 alias records)"
  value       = module.alb.alb_zone_id
}

output "nlb_dns_name" {
  description = "Public DNS name of the Network Load Balancer"
  value       = module.nlb.nlb_dns_name
}

output "nlb_zone_id" {
  description = "Hosted zone ID of the NLB (for Route 53 alias records)"
  value       = module.nlb.nlb_zone_id
}

output "vpc_id" {
  description = "ID of the created VPC"
  value       = module.vpc.vpc_id
}

output "ecs_cluster_name" {
  description = "Name of the ECS cluster"
  value       = module.ecs.cluster_name
}

output "backend_service_name" {
  description = "Name of the ECS service running the FastAPI backend"
  value       = module.ecs.backend_service_name
}

output "frontend_service_name" {
  description = "Name of the ECS service running the Next.js frontend"
  value       = module.ecs.frontend_service_name
}

output "acm_certificate_arn" {
  description = "ARN of the ACM TLS certificate attached to the ALB HTTPS listener"
  value       = module.acm.certificate_arn
}
