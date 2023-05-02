# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /src
COPY . .
RUN yarn add vite
RUN yarn install 
EXPOSE 5173
CMD ["npm", "run", "dev"]

