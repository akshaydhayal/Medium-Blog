FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install
RUN npm i typescript
# RUN npx tsc
RUN npm run build
RUN npx prisma generate
# RUN npx prisma migrate dev --name init

EXPOSE 3001

CMD ["npm","run","start"]