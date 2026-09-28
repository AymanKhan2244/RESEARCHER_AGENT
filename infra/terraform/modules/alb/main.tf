########################################################################
# ALB Module – Application Load Balancer
#
# Layer-7 (HTTP/HTTPS) load balancer for:
#   • Next.js Frontend  ? port 443 ? path /* (default)
#   • FastAPI Backend   ? port 443 ? path /api/* /chats* /chat*
#
# Traffic flow:
#   Internet ? ALB (public subnets) ? ECS tasks (private subnets)
########################################################################

resource "aws_lb" "alb" {
  name               = "${var.project_name}-${var.environment}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [var.alb_sg_id]
  subnets            = var.public_subnet_ids

  enable_deletion_protection       = var.enable_deletion_protection
  enable_cross_zone_load_balancing = true
  enable_http2                     = true
  idle_timeout                     = 60

  access_logs {
    bucket  = aws_s3_bucket.alb_logs.bucket
    prefix  = "alb"
    enabled = true
  }

  tags = { Name = "${var.project_name}-${var.environment}-alb" }
}

# -- S3 Bucket for ALB Access Logs ------------------------------------

resource "aws_s3_bucket" "alb_logs" {
  bucket        = "${var.project_name}-${var.environment}-alb-logs-${random_id.suffix.hex}"
  force_destroy = true

  tags = { Name = "${var.project_name}-${var.environment}-alb-logs" }
}

resource "random_id" "suffix" {
  byte_length = 4
}

resource "aws_s3_bucket_policy" "alb_logs" {
  bucket = aws_s3_bucket.alb_logs.id
  policy = data.aws_iam_policy_document.alb_logs.json
}

data "aws_elb_service_account" "main" {}

data "aws_iam_policy_document" "alb_logs" {
  statement {
    principals {
      type        = "AWS"
      identifiers = [data.aws_elb_service_account.main.arn]
    }
    actions   = ["s3:PutObject"]
    resources = ["${aws_s3_bucket.alb_logs.arn}/alb/AWSLogs/*"]
  }
}

# -- Target Group: FastAPI Backend -------------------------------------

resource "aws_lb_target_group" "backend" {
  name             = "${var.project_name}-${var.environment}-be-tg"
  port             = var.backend_port
  protocol         = "HTTP"
  vpc_id           = var.vpc_id
  target_type      = "ip"   # required for Fargate
  protocol_version = "HTTP1"

  health_check {
    enabled             = true
    path                = var.health_check_path
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 3
  }

  stickiness {
    type    = "lb_cookie"
    enabled = false
  }

  tags = { Name = "${var.project_name}-${var.environment}-backend-tg" }
}

# -- Target Group: Next.js Frontend -----------------------------------

resource "aws_lb_target_group" "frontend" {
  name             = "${var.project_name}-${var.environment}-fe-tg"
  port             = var.frontend_port
  protocol         = "HTTP"
  vpc_id           = var.vpc_id
  target_type      = "ip"
  protocol_version = "HTTP1"

  health_check {
    enabled             = true
    path                = "/"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 3
  }

  tags = { Name = "${var.project_name}-${var.environment}-frontend-tg" }
}

# -- Listener: HTTP ? redirect to HTTPS -------------------------------

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

# -- Listener: HTTPS (port 443) ----------------------------------------
# Default action forwards to the Next.js frontend.
# Backend API routes are matched via path-based rules (higher priority).

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.alb.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = var.certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend.arn
  }
}

# -- Listener Rules: route API traffic to backend ----------------------

resource "aws_lb_listener_rule" "api_routes" {
  listener_arn = aws_lb_listener.https.arn
  priority     = 10

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.backend.arn
  }

  condition {
    path_pattern {
      values = ["/chat", "/chat/*", "/chats", "/chats/*", "/api/*"]
    }
  }
}
