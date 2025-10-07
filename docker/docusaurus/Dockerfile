# Stage 1: Base image.
## Start with a base image containing NodeJS so we can build Docusaurus.
FROM node:lts-alpine AS base
## Disable colour output from yarn to make logs easier to read.
## Enable corepack.
RUN corepack enable
## Set the working directory to `/opt/docusaurus`.
WORKDIR /opt/docusaurus

# Stage 2a: Development mode.
FROM base AS install-docusaurus
## Set the working directory to `/opt/docusaurus`.
WORKDIR /opt/docusaurus
COPY /docusaurus/Wiki .
## Run the development server.
RUN npm install

# Stage 2b: Production build mode.
FROM base AS production
## Set the working directory to `/opt/docusaurus`.
WORKDIR /opt/docusaurus
## Copy over the source code.
COPY /docusaurus/Wiki /opt/docusaurus/
COPY /docs/personal-site /opt/docusaurus/docs/personal-site/
## Install dependencies with `--immutable` to ensure reproducibility.
RUN npm ci

## Build the static site.
RUN npm run build