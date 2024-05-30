FROM node:20-alpine3.19

RUN npm i -g @nestjs/cli

USER node

RUN mkdir /home/node/project

WORKDIR /home/node/project

CMD ["npm", "run", "start:dev"]
