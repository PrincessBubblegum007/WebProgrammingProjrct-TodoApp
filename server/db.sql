drop database if exists todo;

create database todo;


create table task (
    id SERIAL Primary Key,
    descripton varchar(255) not null  
)

insert into task (descripton) values ("My test task");
insert into task (descripton) values ("My another task");