# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /src
COPY . .
RUN yarn add vite
RUN yarn install 
EXPOSE 8080
CMD ["npm", "run", "dev"]

