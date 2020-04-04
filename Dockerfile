FROM node:10

WORKDIR /usr/src/app

ARG CMS_URL

ENV CMS_URL=$CMS_URL
ENV BITLY_API_KEY=$BITLY_API_KEY

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "start"]
