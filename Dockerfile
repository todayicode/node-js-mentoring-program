FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install && npm rebuild bcrypt --build-from-source

COPY . .

EXPOSE 3000

CMD [ "node", "dist/server.js" ]
