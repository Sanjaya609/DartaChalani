FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY ng.conf /etc/nginx/conf.d
# copy the build folder from react to the root of nginx (www)
COPY ./build/.  /usr/share/nginx/html/.
# expose port
EXPOSE 4000

