FROM node:lts as build

WORKDIR /app

ADD package.json /app
ADD package-lock.json /app
RUN npm install

ADD . /app
RUN npm run build

ENV CSV_PATH /out
VOLUME /out

CMD ["node", "."]
