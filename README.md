# pull the project from docker hub
docker pull dimahirich/react-redux-docker-frontend:react-redux-fr-docker

## to run application
docker run --name movies -p 3000:3000 -e API_URL=http://192.168.1.44:8000/api/v1
(your_super_account/movies)

## To run the composed application, you can use the following command:
docker-compose up --build

## To specify the API_URL environment variable, you can use the -e option like this:
docker-compose up -e API_URL=http://localhost:8000/api/v1