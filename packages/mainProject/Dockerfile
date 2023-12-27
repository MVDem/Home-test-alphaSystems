FROM node

WORKDIR /app/client

COPY package.json ./

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./

RUN npm run build

CMD ["npm", "dev"]