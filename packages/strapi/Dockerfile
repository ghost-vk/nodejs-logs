FROM node:20-bullseye-slim as build

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    autoconf \
    automake \
    zlib1g-dev \
    libpng-dev \
    libvips-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production

WORKDIR /opt/app
RUN yarn global add node-gyp && yarn config set network-timeout 600000 -g
ENV PATH /usr/local/share/.config/yarn/global/node_modules/.bin:$PATH
COPY .yarn .yarn
COPY package.json yarn.lock .yarnrc.yml .
COPY packages/express/package.json packages/express/package.json
COPY packages/gun/package.json packages/gun/package.json
COPY packages/nest/package.json packages/nest/package.json
COPY packages/strapi/package.json packages/strapi/package.json
RUN yarn workspaces focus strapi-logs --production
COPY . .
RUN yarn workspace strapi-logs build

FROM node:20-bullseye-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
COPY --from=build /usr/local/share/.config/yarn/global /usr/local/share/.config/yarn/global
WORKDIR /opt/app
COPY --from=build /opt/app .
ENV PATH /usr/local/share/.config/yarn/global/node_modules/.bin:$PATH

RUN chown -R node:node /opt/app
USER node
EXPOSE 1337
CMD ["yarn", "workspace", "strapi-logs", "start"]
