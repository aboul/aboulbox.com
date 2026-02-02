FROM node:lts-alpine AS base

FROM base AS build-backend
WORKDIR /app
COPY /backend/package*.json .
RUN npm install
COPY . .