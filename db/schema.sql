### Schema

DROP DATABASE IF EXISTS burgerDB;
CREATE DATABASE burgerDB;
USE burgerDB;

CREATE TABLE burgers
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	eaten BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);