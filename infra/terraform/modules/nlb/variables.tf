variable "project_name"               { type = string }
variable "environment"                { type = string }
variable "vpc_id"                     { type = string }
variable "public_subnet_ids"          { type = list(string) }
variable "backend_port"               { type = number }
variable "nlb_port"                   { type = number; default = 80 }
variable "enable_deletion_protection" { type = bool; default = false }
