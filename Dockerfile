FROM node:alpine

RUN npm install -g pnpm@10

WORKDIR /app

COPY package.json .

RUN pnpm install

COPY . .

RUN pnpm build

COPY .env ./dest

EXPOSE 8000

CMD [ "node","dist/src/main" ]

