FROM node:18-alpine

WORKDIR /DartaChalani/

COPY public/ /DartaChalani/public
COPY src/ /DartaChalani/src
COPY package.json /DartaChalani/

EXPOSE 4000

CMD ["npm", "start"]
