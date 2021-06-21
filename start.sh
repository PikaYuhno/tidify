#!/bin/sh
yarn build && docker-compose --env-file ./packages/server/.env up --build
