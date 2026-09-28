output "alb_dns_name"             { value = aws_lb.alb.dns_name }
output "alb_zone_id"              { value = aws_lb.alb.zone_id }
output "alb_arn"                  { value = aws_lb.alb.arn }
output "backend_target_group_arn" { value = aws_lb_target_group.backend.arn }
output "frontend_target_group_arn"{ value = aws_lb_target_group.frontend.arn }
output "https_listener_arn"       { value = aws_lb_listener.https.arn }
