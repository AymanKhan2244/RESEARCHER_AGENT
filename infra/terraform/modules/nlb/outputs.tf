output "nlb_dns_name"            { value = aws_lb.nlb.dns_name }
output "nlb_zone_id"             { value = aws_lb.nlb.zone_id }
output "nlb_arn"                 { value = aws_lb.nlb.arn }
output "backend_target_group_arn"{ value = aws_lb_target_group.backend_tcp.arn }
output "nlb_static_ips"          { value = aws_eip.nlb[*].public_ip }
