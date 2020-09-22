FROM node:latest

WORKDIR usr/app/

COPY package*.json ./
COPY . .

RUN yarn 
EXPOSE 4000