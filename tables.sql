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

