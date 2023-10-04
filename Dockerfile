FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ng.conf /etc/nginx/conf.d
COPY  ./build /usr/share/nginx/html
