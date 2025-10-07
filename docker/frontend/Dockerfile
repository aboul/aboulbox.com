FROM node:lts-alpine AS base

# Stage 1: Install dependencies
FROM base AS install-frontend
WORKDIR /app
COPY /frontend/package*.json .
RUN npm install
COPY /frontend .

# Stage 2: Production server
FROM install-frontend AS build-frontend     
WORKDIR /app

ARG SERVER_NAME
ARG UMAMI_WEBSITE_CODE

COPY /frontend .
RUN npm run build-production

FROM busybox:stable AS production
WORKDIR /app

COPY --from=build-frontend /app/dist/ /app

CMD ["busybox", "httpd", "-f", "-v", "-p", "8080"]