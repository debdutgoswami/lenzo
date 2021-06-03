
FROM node:12.18.3-alpine as build

WORKDIR /app
COPY ./package.json /app/
COPY ./package-lock.json /app/
RUN npm install --silent
COPY . /app
RUN npm run build

# ---
FROM nginx:alpine

WORKDIR /etc/nginx
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]