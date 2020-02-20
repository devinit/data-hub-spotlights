FROM node:10

WORKDIR /usr/src/app

ARG ASSETS_SOURCE_URL

ENV ASSETS_SOURCE_URL=$ASSETS_SOURCE_URL

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD cross-env NODE_ENV=production node index.js
