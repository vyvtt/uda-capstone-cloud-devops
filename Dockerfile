FROM nginx

# Remove old file
RUN rm -frv /usr/share/nginx/html/*

# Copy source code to nginx html directory
COPY src/ /usr/share/nginx/html/

RUN echo $(ls -1 /usr/share/nginx/html/)