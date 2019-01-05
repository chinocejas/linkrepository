create database database_links;
use database_links;

create table users(
    id int(11) NOT NULL,
    username varchar(16) NOT NULL,
    password varchar(60) NOT NULL,
    fullname varchar(100),
);

ALTER TABLE users
    ADD PRIMARY KEY (id);
ALTER TABLE users MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2 ;

describe users;