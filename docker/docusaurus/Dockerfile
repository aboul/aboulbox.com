FROM node:lts-alpine AS base

# Stage 1: Install dependencies
FROM base AS build-docusaurus
WORKDIR /app
COPY /docusaurus/Wiki/package*.json .
RUN npm install
COPY /docusaurus/Wiki .

EXPOSE 3000 