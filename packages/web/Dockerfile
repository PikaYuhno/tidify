FROM node:12 as builder

WORKDIR /usr/src/app

# Only copy package.json
COPY ./package.json .
COPY ./packages/common/package.json ./packages/common/
COPY ./packages/web/package.json ./packages/web/

# Install dependencies
RUN yarn install

# Copy the compiles files
COPY ./packages/common/dist ./packages/common/dist/

# Copy built web 
COPY ./packages/web/build ./packages/web/build/

# Copy the code for web
COPY ./packages/web ./packages/web

#WORKDIR /usr/src/app/packages/web
#RUN yarn build:prod

FROM nginx
WORKDIR /usr/share/nginx/html

COPY --from=builder /usr/src/app/packages/web/build .
COPY --from=builder /usr/src/app/packages/web/nginx.conf /etc/nginx/conf.d/default.conf  
RUN cat /etc/nginx/conf.d/default.conf
