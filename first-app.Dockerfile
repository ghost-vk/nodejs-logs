FROM node:18-bullseye-slim
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
CMD ["/bin/sh", "-c", "node src/first-app.js"]

