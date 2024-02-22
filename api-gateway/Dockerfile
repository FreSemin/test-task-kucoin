FROM node:20-alpine3.18 as dev

ARG NODE_ENV=development 
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/api-gateway

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine3.18 as prod

ARG NODE_ENV=prod
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/api-gateway

COPY --from=dev /usr/src/app/api-gateway/node_modules ./node_modules
COPY --from=dev /usr/src/app/api-gateway/package*.json ./
COPY --from=dev /usr/src/app/api-gateway/dist ./dist
COPY --from=dev /usr/src/app/api-gateway/prisma ./prisma

CMD [ "npm", "run", "start:prod-docker" ]