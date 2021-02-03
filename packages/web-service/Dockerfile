FROM node:12-alpine
WORKDIR app/
COPY . .
RUN npx next telemetry disable
RUN npm install -s
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
