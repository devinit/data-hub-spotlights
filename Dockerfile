FROM node:10

WORKDIR /usr/src/app/

ARG CMS_URL
ARG BITLY_API_KEY

ENV CMS_URL=$CMS_URL
ENV BITLY_API_KEY=$BITLY_API_KEY

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ./node_modules/.bin/cross-env NODE_ENV=production node index.js
