# Stage 1: Base image.
## Start with a base image containing NodeJS so we can build Docusaurus.
FROM node:lts-alpine AS base

## Enable corepack.
RUN corepack enable

USER node
## Set the working directory to `/opt/docusaurus`.
WORKDIR /home/node/app
# Copy the source code over
COPY --chown=node:node ./docusaurus/Wiki /home/node/app/

# Stage 2a: Development mode.
FROM base AS install-docusaurus
## Set the working directory to `/opt/docusaurus`.
WORKDIR /home/node/app
# Copy the source code over
COPY --chown=node:node ./docusaurus/Wiki /home/node/app/
COPY --chown=node:node ./docs/personal-site /home/node/app/docs/personal-site/
## Run the development server.
RUN npm install

# Stage 2b: Production build mode.
FROM base AS production
## Set the working directory to `/opt/docusaurus`.
WORKDIR /opt/docusaurus
## Copy over the source code.
COPY --chown=node:node /docusaurus/Wiki /opt/docusaurus/
COPY --chown=node:node /docs/personal-site /opt/docusaurus/docs/personal-site/
## Install dependencies with `--immutable` to ensure reproducibility.
RUN npm ci

## Build the static site.
RUN npm run build