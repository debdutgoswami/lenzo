#!/bin/bash
echo ----------------------------
echo killing old docker processes
echo ----------------------------
sudo docker-compose rm -fs
echo ----------------------------
echo building and running docker containers
echo ----------------------------
sudo docker-compose up --build -d
echo ----------------------------
echo waiting for db to set-up...
sleep 20
echo ----------------------------
echo collecting static files
echo ----------------------------
sudo docker-compose exec backend python manage.py collectstatic --noinput
echo ----------------------------
echo flushing and migrating data from fixtures
echo ----------------------------
sudo docker-compose exec backend python manage.py flush --no-input
sudo docker-compose exec backend python manage.py migrate
sudo docker-compose exec backend python manage.py loaddata /usr/src/app/lenzo/fixtures/test_data.json
echo ----------------------------
echo creating super user
echo ----------------------------
sudo docker-compose exec backend python manage.py createsuperuser --noinput
echo ----------------------------