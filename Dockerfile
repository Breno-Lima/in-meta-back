FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install sharp -g

COPY . .
RUN npm run build

EXPOSE 3033
CMD ["npm", "run", "start"]
