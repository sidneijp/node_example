FROM node:17

RUN apt update

RUN apt install -y build-essential libsqlite3-dev

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

#ENTRYPOINT ["npm"]

CMD ["npm", "run", "start-dev"]
