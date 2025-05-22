docker build --tag fashion-e-commerce_front-end:v1.0.0 .
docker container rm -f fashion-e-commerce-front-end
docker run -d --name fashion-e-commerce-front-end -p 5174:80 fashion-e-commerce_front-end:v1.0.0