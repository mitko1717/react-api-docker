# FROM node as builder
FROM webbylabhub/movies
WORKDIR /
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]