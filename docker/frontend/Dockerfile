FROM node:lts-alpine AS base

# Stage 1: Install dependencies
FROM base AS install-frontend
WORKDIR /app
COPY /frontend/package*.json .
RUN npm install
COPY /frontend .

RUN npm install -g serve

ARG SERVER_NAME
ARG UMAMI_WEBSITE_CODE

COPY /frontend .
