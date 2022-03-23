## Install Docker
Read Documentation on: https://docs.docker.com/desktop/mac/install/

## start images: mysql, server, client... this may take some minutes... please wait.
docker-compose up -d

## Client - Web Interface
http://localhost:3000/

## Server - REST API
http://localhost:7000/

## see logs
docker-compose logs

## check which containers are running
docker ps

## build again
docker-compose up --build

## REST API - Endpoints
# TODO: 
# Use Filtering,e.g. https://mysite.com/posts?tags=javascript
# Sorting, 
# and Pagination to Retrieve the Data Requested 
# Use SSL for Security

# Items
GET /items
GET /items/:name
POST /items/
PATCH /items/:name
DELETE /items/:name

# Users
GET /users
GET /users/:email
GET /users/:name
POST /users
PUT /users/:email
DELETE /users/:email

# StockMovements
GET /stock
GET /stock/:item
GET /stock/current/:item
POST /stock
PATCH /stock/:creationdate
DELETE /stock/:creationdate

# Orders
GET /orders
GET /orders/incomplete
GET /orders/:item
GET /orders/date/:creationdate
POST /orders
PATCH /orders/quantity/:creationdate
PATCH /orders/status/:creationdate
PATCH /orders/accept/:creationdate
DELETE /orders/:creationdate