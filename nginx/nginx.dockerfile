FROM nginx:1.13.3
# Remove any existing config files
RUN rm /etc/nginx/conf.d/default.conf
# Copy the Nginx configuration
COPY ./nginx/default.conf /etc/nginx/conf.d/
# Expose website on port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]