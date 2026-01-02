FROM caddy:2.10.2-builder-alpine AS builder

RUN xcaddy build \
    --with github.com/greenpau/caddy-security \
    --with github.com/caddyserver/transform-encoder

FROM caddy:2.10.2-alpine

RUN apk --update --no-cache add nano

COPY --from=builder /usr/bin/caddy /usr/bin/caddy