FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .
RUN npm run build

FROM node:22

WORKDIR /app
COPY --from=builder /app /app

CMD ["npm", "start"]