# Full Stack Web App - Prodsmart
#### Follow the instructions to run the web app.

# Install Docker
Read Documentation on: https://docs.docker.com/desktop/mac/install/

# Start Docker Compose 
### Images: mysql, server, client... This may take some minutes...
```
docker-compose up -d
```
# Create Tables and Insert Content into MySQL Database 
```
CREATE TABLE item (
	name varchar(512),
	PRIMARY KEY(name)
);

CREATE TABLE stockmovement (
	creationdate datetime,
	quantity	 int,
	item_name	 varchar(512),
	PRIMARY KEY(creationdate,item_name)
);

CREATE TABLE user (
	name	 varchar(512),
	email varchar(512),
	PRIMARY KEY(email)
);

CREATE TABLE orderitem (
	creationdate datetime,
	quantity	 int,
	status	 boolean,
	item_name	 varchar(512),
	user_email	 varchar(512) NOT NULL,
	PRIMARY KEY(creationdate,item_name)
);

ALTER TABLE stockmovement ADD CONSTRAINT stockmovement_fk1 FOREIGN KEY (item_name) REFERENCES item(name);
ALTER TABLE orderitem ADD CONSTRAINT orderitem_fk1 FOREIGN KEY (item_name) REFERENCES item(name);
ALTER TABLE orderitem ADD CONSTRAINT orderitem_fk2 FOREIGN KEY (user_email) REFERENCES user(email);

INSERT into user values('Renato Santos','renatojmsantos@gmail.com');
INSERT into item values('PlayStation 5');
insert into stockmovement values('2022-01-20 23:10:03',100,'PlayStation 5');
insert into orderitem values('2022-01-19 23:01:15',5,false,'PlayStation 5','renatojmsantos@gmail.com');
```
# Web App is Ready!
![alt text](https://raw.githubusercontent.com/renatojmsantos/webapp/master/printScreens/Screenshot%202022-03-23%20at%2020.26.08.png?token=GHSAT0AAAAAABVKOOQRXBCJEV5A5WTNMCHSYVMTVAA)

# Client - Web Interface - React JS + Material UI
#### http://localhost:3000/

# Server - REST API - Node JS + Express + MySQL

#### http://localhost:7000/

## Physical Diagram - MySQL database
![alt text](https://raw.githubusercontent.com/renatojmsantos/webapp/master/db_physical_diagram.png?token=GHSAT0AAAAAABVKOOQRZBDEIUTJXOFZKGLAYVMTT3A)

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
