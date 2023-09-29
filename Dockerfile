FROM node:18-alpine

WORKDIR /DartaChalani/

COPY public/ /DartaChalani/public
COPY src/ /DartaChalani/src
COPY package.json /DartaChalani/

RUN npm install --legacy-peer-deps

CMD ["npm", "start"]
