FROM node:alpine

RUN npm install -g pnpm@10

WORKDIR /app

COPY package.json .

RUN pnpm install

COPY ./dist .

EXPOSE 8000

CMD [ "node","src/main.js" ]
