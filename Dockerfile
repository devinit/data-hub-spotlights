FROM node:10

WORKDIR /usr/src/app

ARG CMS_URL

ENV CMS_URL=$CMS_URL

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ./node_modules/.bin/cross-env NODE_ENV=production node index.js