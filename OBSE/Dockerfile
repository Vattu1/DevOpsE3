FROM node:12
WORKDIR /app-obse
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "receiver.js" ]
