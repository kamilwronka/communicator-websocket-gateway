FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN yarn

EXPOSE 8888

ENTRYPOINT [ "yarn", "start:dev" ]