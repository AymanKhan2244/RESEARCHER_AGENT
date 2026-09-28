########################################################################
# NLB Module – Network Load Balancer
#
# Layer-4 (TCP) load balancer for:
#   • FastAPI Backend – low-latency, TCP pass-through on port 80
#
# Use cases:
#   • WebSocket connections that need stable IPs
#   • High-throughput / latency-sensitive API calls
#   • Static IP addresses (useful for IP-whitelisting)
#   • Internal service-to-service TCP traffic
#
# Traffic flow:
#   Client (TCP) ? NLB (public subnets, static EIPs) ? ECS tasks (private)
########################################################################

# Elastic IPs – NLB gets static IPs per AZ for IP-whitelisting scenarios
resource "aws_eip" "nlb" {
  count  = length(var.public_subnet_ids)
  domain = "vpc"
  tags   = { Name = "${var.project_name}-${var.environment}-nlb-eip-${count.index + 1}" }
}

resource "aws_lb" "nlb" {
  name               = "${var.project_name}-${var.environment}-nlb"
  internal           = false
  load_balancer_type = "network"

  # Attach one static EIP per public subnet
  dynamic "subnet_mapping" {
    for_each = toset(var.public_subnet_ids)
    content {
      subnet_id     = subnet_mapping.key
      allocation_id = aws_eip.nlb[index(var.public_subnet_ids, subnet_mapping.key)].id
    }
  }

  enable_deletion_protection       = var.enable_deletion_protection
  enable_cross_zone_load_balancing = true

  tags = { Name = "${var.project_name}-${var.environment}-nlb" }
}

# -- Target Group: FastAPI Backend (TCP) -------------------------------

resource "aws_lb_target_group" "backend_tcp" {
  name        = "${var.project_name}-${var.environment}-nlb-be-tg"
  port        = var.backend_port
  protocol    = "TCP"
  vpc_id      = var.vpc_id
  target_type = "ip"   # Fargate requires IP target type

  # TCP health check – checks that the backend container is accepting connections
  health_check {
    enabled             = true
    protocol            = "TCP"
    interval            = 30
    healthy_threshold   = 3
    unhealthy_threshold = 3
  }

  # Preserve source IP (no SNAT) – the backend sees client IPs directly
  preserve_client_ip = true

  tags = { Name = "${var.project_name}-${var.environment}-nlb-backend-tg" }
}

# -- Listener: TCP port 80 ? backend ----------------------------------

resource "aws_lb_listener" "tcp_backend" {
  load_balancer_arn = aws_lb.nlb.arn
  port              = var.nlb_port
  protocol          = "TCP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend_tcp.arn
  }
}

# -- Listener: TLS port 443 ? backend (optional mutual-auth path) ------
# Uncomment if you want end-to-end TLS on the NLB path.
#
# resource "aws_lb_listener" "tls_backend" {
#   load_balancer_arn = aws_lb.nlb.arn
#   port              = 443
#   protocol          = "TLS"
#   certificate_arn   = var.certificate_arn   # add this variable if needed
#   ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
#
#   default_action {
#     type             = "forward"
#     target_group_arn = aws_lb_target_group.backend_tcp.arn
#   }
# }
