FROM node:12
WORKDIR /app-orig
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "sender.js" ]
