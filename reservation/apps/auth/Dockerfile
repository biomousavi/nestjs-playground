FROM node:alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json tsconfig.json


COPY apps/auth apps/auth
COPY libs libs


# install common dependencies
RUN npm install 

# install micro-service dependencies
RUN cd apps/auth && npm install

# build applicaiton
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

CMD [ "node", "dist/apps/auth/main" ]