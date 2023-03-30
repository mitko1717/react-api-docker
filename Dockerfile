FROM webbylabhub/movies
ENV API_URL=http://localhost:8000/api/v1
WORKDIR /
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]