# Stage 1: Build TypeScript
FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
RUN npx prisma generate

# Stage 2: Production image
FROM node:20
WORKDIR /app

COPY --from=builder /app /app
COPY .env .env

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.js"]
