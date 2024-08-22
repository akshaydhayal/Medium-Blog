FROM node:22-alpine

WORKDIR /app
COPY package.json package-lock.json .

RUN npm install
RUN npm i typescript

COPY . .

RUN npm run build
RUN npx prisma generate

EXPOSE 3001

CMD ["npm","run","start"]
