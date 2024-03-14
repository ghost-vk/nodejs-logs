FROM node:20-bullseye-slim
WORKDIR /app
COPY . .
RUN --mount=type=cache,mode=0777,target=/root/.yarn yarn workspaces focus node --production
CMD ["/bin/sh", "-c", "node packages/node/second-app.js"]

