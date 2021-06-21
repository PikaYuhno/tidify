FROM node:12
WORKDIR /usr/src/app
 
COPY ./package.json .
COPY ./packages/common/package.json ./packages/common/
COPY ./packages/server/package.json ./packages/server/

RUN yarn install --prod

#WORKDIR /usr/src/app/packages/common
#RUN yarn build

#WORKDIR /usr/src/app/packages/server
#RUN yarn build

COPY ./packages/common/dist ./packages/common/dist
COPY ./packages/server/dist ./packages/server/dist

COPY ./packages/server/.env ./packages/server/

WORKDIR ./packages/server

CMD ["node", "dist/index.js"]
