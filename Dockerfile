FROM node:18-alpine

WORKDIR /DartaChalani/

COPY public/ /DartaChalani/public
COPY src/ /DartaChalani/src
COPY package.json /DartaChalani/

RUN npm install

CMD ["npm", "start"]
