drop database if exists todo;

create database todo;


create table task (
    id SERIAL Primary Key,
    description varchar(255) not null  
);

INSERT INTO task (description) VALUES ('My test task');
INSERT INTO task (description) VALUES ('My another task');