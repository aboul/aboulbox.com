FROM caddy:2.11.9-builder-alpine AS builder

RUN xcaddy build \
    --with github.com/caddyserver/transform-encoder

FROM caddy:2.11.9-alpine

RUN apk --update --no-cache add nano

COPY --from=builder /usr/bin/caddy /usr/bin/caddy