FROM node:14-alpine

RUN mkdir -p /app
WORKDIR /app

ARG revision=0
ARG envFile=0
ARG pm2PublicKey=0
ARG pm2SecretKey=0

COPY . .
COPY $envFile .env

ENV REVISION $revision
ENV NODE_ENV production
ENV PM2_PUBLIC_KEY $pm2PublicKey
ENV PM2_SECRET_KEY $pm2SecretKey
ENV BROADCAST_LOGS 1

RUN npm install

EXPOSE 80
CMD [ "npm", "run", "start:aws" ]
