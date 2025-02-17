# Etapa 1: Construção
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .
RUN npm run build

# Etapa 2: Execução
FROM node:20

WORKDIR /app
COPY --from=builder /app /app

CMD ["npm", "start"]