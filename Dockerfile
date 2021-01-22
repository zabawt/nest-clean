FROM node:12

WORKDIR /app

ADD . /app

RUN npm install --quiet

EXPOSE 3000

CMD ["npm", "run", "start:dev"]