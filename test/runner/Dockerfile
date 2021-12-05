FROM node:16.13.0-alpine

RUN apk add -U jq wget
WORKDIR /src
COPY package*.json ./
RUN npm install
RUN sed -i 's|https://api.twitch.tv/helix|http://twitch-api:8080/mock|g' \
  node_modules/@twurple/api-call/lib/helpers/url.js \
  node_modules/@twurple/api-call/es/helpers/url.mjs
RUN sed -i 's|https://id.twitch.tv/oauth2|http://twitch-api:8080/auth|g' \
  node_modules/@twurple/api-call/lib/helpers/url.js \
  node_modules/@twurple/api-call/es/helpers/url.mjs
COPY . .

ENTRYPOINT ["./test/runner/entrypoint.sh"]
