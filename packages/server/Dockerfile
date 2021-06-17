FROM node:12
WORKDIR /usr/src/app
 
COPY ./package.json .

COPY ./packages/common ./packages/common
COPY ./packages/server ./packages/server

ENV NODE_ENV development

RUN yarn install

ENV NODE_ENV production

WORKDIR /usr/src/app/packages/common
RUN yarn build

WORKDIR /usr/src/app/packages/server
RUN yarn build

COPY ./packages/common/dist ./packages/common/dist
COPY ./packages/server/dist ./packages/server/dist

WORKDIR ./packages/server/dist
COPY .env .

CMD node index.js
