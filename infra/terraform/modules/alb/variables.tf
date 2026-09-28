variable "project_name"               { type = string }
variable "environment"                { type = string }
variable "vpc_id"                     { type = string }
variable "public_subnet_ids"          { type = list(string) }
variable "alb_sg_id"                  { type = string }
variable "certificate_arn"            { type = string }
variable "backend_port"               { type = number }
variable "frontend_port"              { type = number }
variable "health_check_path"          { type = string; default = "/chats" }
variable "enable_deletion_protection" { type = bool; default = false }
