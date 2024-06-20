FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json tsconfig.json

RUN npm install 

COPY apps/notifications apps/notifications
COPY libs libs

# build applicaiton
RUN npm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

# exclude dev dependencies
RUN npm install 

# copy build source that used dev dependencies to prod
COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/apps/notifications/main" ]