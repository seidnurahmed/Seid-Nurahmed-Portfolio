# ---- Build stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm i
COPY public ./public
COPY src ./src
# REACT_APP_API_URL is injected at build time by docker-compose env
RUN npm run build

# ---- Run stage (NGINX) ----
FROM nginx:1.27-alpine
# SPA routing + sensible caching
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
