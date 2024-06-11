FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install 

COPY . .

RUN npm run build


FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

# exclude dev dependencies
RUN npm install --only=prod

# copy build source that used dev dependencies to prod
COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/apps/notifications/main" ]