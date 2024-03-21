FROM node:20-bullseye-slim as build
ENV NODE_ENV=production
WORKDIR /opt/app
COPY .yarn .yarn
COPY package.json yarn.lock .yarnrc.yml .
COPY packages/express/package.json packages/express/package.json
COPY packages/gun/package.json packages/gun/package.json
COPY packages/nest/package.json packages/nest/package.json
COPY packages/strapi/package.json packages/strapi/package.json
RUN yarn workspaces focus express --production
COPY . .
RUN yarn workspace express build

FROM node:20-bullseye-slim
ENV NODE_ENV=production
WORKDIR /opt/app
COPY --from=build /opt/app .
RUN chown -R node:node /opt/app
USER node
EXPOSE 4000
CMD ["yarn", "workspace", "express", "start:prod"]
