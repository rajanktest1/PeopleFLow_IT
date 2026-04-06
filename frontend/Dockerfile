# ---- Stage 1: Build ----
FROM node:20-alpine3.21 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Stage 2: Serve with Nginx ----
FROM nginx:1.27-alpine3.21
# Apply latest Alpine security patches (fixes OS-level CVEs in libcrypto, libpng, libxml2 etc.)
RUN apk update && apk upgrade --no-cache && rm -rf /var/cache/apk/*
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:80/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
