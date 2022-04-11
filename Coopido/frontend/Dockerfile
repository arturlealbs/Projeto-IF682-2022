FROM node:17-alpine

WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm install @angular/cli -g

CMD ng serve --host 0.0.0.0 --poll 1

EXPOSE 49153