FROM node:14-alpine

WORKDIR /checkout

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build


CMD ["node", "--trace-warnings", "dist/main"]