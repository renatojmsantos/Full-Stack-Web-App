# Install Docker
Read Documentation on: https://docs.docker.com/desktop/mac/install/

# Start Docker Compose 
### Images: mysql, server, client... This may take some minutes...
```
docker-compose up -d
```

# Web App is Ready!
![alt text](https://raw.githubusercontent.com/renatojmsantos/webapp/master/printScreens/Screenshot%202022-03-23%20at%2020.26.08.png?token=GHSAT0AAAAAABMMJRQLKBNSPJRDL3DWGMIQYSEZ4GA)

# Client - Web Interface
http://localhost:3000/

# Server - REST API
http://localhost:7000/



## REST API - Endpoints
#### TODO: Use Filtering, Sorting, Pagination, SSL

### Items
```
GET /items

GET /items/:name

POST /items/

PATCH /items/:name

DELETE /items/:name
```
### Users
```
GET /users

GET /users/:email

GET /users/:name

POST /users

PUT /users/:email

DELETE /users/:email
```
### StockMovements
```
GET /stock

GET /stock/:item

GET /stock/current/:item

POST /stock

PATCH /stock/:creationdate

DELETE /stock/:creationdate
```
### Orders
```
GET /orders

GET /orders/incomplete

GET /orders/:item

GET /orders/date/:creationdate

POST /orders

PATCH /orders/quantity/:creationdate

PATCH /orders/status/:creationdate

PATCH /orders/accept/:creationdate

DELETE /orders/:creationdate
```
