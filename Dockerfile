FROM mhart/alpine-node:8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
RUN npm install --quiet
COPY . .
EXPOSE 3000