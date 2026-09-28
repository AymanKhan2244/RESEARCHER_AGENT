variable "project_name"           { type = string }
variable "environment"            { type = string }
variable "vpc_id"                 { type = string }
variable "private_subnet_ids"     { type = list(string) }
variable "ecs_tasks_sg_id"        { type = string }
variable "backend_image"          { type = string }
variable "frontend_image"         { type = string }
variable "backend_port"           { type = number }
variable "frontend_port"          { type = number }
variable "alb_backend_tg_arn"     { type = string }
variable "alb_frontend_tg_arn"    { type = string }
variable "nlb_backend_tg_arn"     { type = string }
variable "backend_desired_count"  { type = number; default = 2 }
variable "frontend_desired_count" { type = number; default = 2 }
variable "aws_region"             { type = string }
variable "groq_api_key_arn"       { type = string; sensitive = true }
variable "tavily_api_key_arn"     { type = string; sensitive = true }
variable "langsmith_api_key_arn"  { type = string; sensitive = true }
