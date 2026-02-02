# Stage 1: Base image.
## Start with a base image containing NodeJS so we can build Docusaurus.
FROM node:lts-alpine

## Enable corepack.
RUN corepack enable

USER node

## Set the working directory to `/opt/docusaurus`.
WORKDIR /home/node/app

# Copy the source code over
COPY --chown=node:node ./wiki /home/node/app/
