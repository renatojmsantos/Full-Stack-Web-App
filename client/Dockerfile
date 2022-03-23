FROM node:14.15.1

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

COPY . /app

RUN npm install

CMD ["npm", "start"]
