########################################################################
# Nginx Load Balancer – Dockerfile
########################################################################
FROM nginx:1.27-alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom configs
COPY nginx.conf      /etc/nginx/nginx.conf
COPY conf.d/app.conf /etc/nginx/conf.d/app.conf

# Create log directory
RUN mkdir -p /var/log/nginx

# Expose HTTP and HTTPS
EXPOSE 80 443

# Use the official entrypoint (starts nginx in foreground)
CMD ["nginx", "-g", "daemon off;"]
