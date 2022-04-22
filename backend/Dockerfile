FROM node:17-alpine

WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

CMD yarn dev

EXPOSE 3000