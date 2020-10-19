FROM node:12
WORKDIR /app-imed
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "senderReceiver.js" ]
