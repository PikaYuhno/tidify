FROM node:12 as builder
WORKDIR /usr/src/app


COPY ./package.json .

COPY ./packages/common ./packages/common
COPY ./packages/web ./packages/web

RUN yarn install --production

WORKDIR /usr/src/app/packages/common
RUN yarn build

WORKDIR /usr/src/app/packages/web
RUN yarn build

FROM nginx
WORKDIR /usr/share/nginx/html

COPY --from=builder /usr/src/app/packages/web/build .
COPY --from=builder /usr/src/app/packages/web/nginx.conf /etc/nginx/conf.d/default.conf  
