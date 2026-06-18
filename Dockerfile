# Stage 1: Build & install dependencies
FROM node:20-alpine AS builder
WORKDIR /usr/src/app
COPY app/package*.json ./
RUN npm ci --only=production

# Stage 2: Final lightweight image
FROM node:20-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY app/ .

EXPOSE 8000
USER node

CMD ["node", "index.js"]