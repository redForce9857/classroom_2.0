FROM node:18-alpine

WORKDIR /classroom

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build 

EXPOSE 8080
CMD ["node", "dist/src/main.js"]
