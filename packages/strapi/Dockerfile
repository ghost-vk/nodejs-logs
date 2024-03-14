FROM node:20-bullseye-slim
RUN apt update && apt upgrade && apt install -y git && apt-get clean
ENV NODE_ENV production
WORKDIR /app
COPY . .
RUN yarn workspaces focus strapi-logs
RUN yarn workspace strapi-logs build
EXPOSE 1337
CMD ["yarn", "workspace", "strapi-logs", "start"]
