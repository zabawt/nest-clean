FROM node:12-alpine
WORKDIR app/
COPY . .
RUN npm install @nestjs/cli -g
RUN npm install -s --only=production
RUN npm run build
EXPOSE 3000

CMD ["npm", "run", "start:prod"]
