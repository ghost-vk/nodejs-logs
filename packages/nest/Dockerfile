FROM node:20-bullseye-slim as build
ENV NODE_ENV=production
WORKDIR /opt/app
COPY .yarn .yarn
COPY package.json yarn.lock .yarnrc.yml .
COPY packages/gun/package.json packages/gun/package.json
COPY packages/nest/package.json packages/nest/package.json
COPY packages/strapi/package.json packages/strapi/package.json
RUN yarn workspaces focus nest --production
COPY . .
RUN yarn workspace nest build

FROM node:20-bullseye-slim
ENV NODE_ENV=production
WORKDIR /opt/app
COPY --from=build /opt/app .
RUN chown -R node:node /opt/app
USER node
EXPOSE 3535
CMD ["yarn", "workspace", "nest", "start"]
