drop database if exists WorkoutDB;
create database WorkoutDB;
use WorkoutDB;

drop table if exists UserInfo;

create table UserInfo(
UID int not null auto_increment,
name Varchar (100),
sex boolean,
age int(100),
weight int (100),
height int (100),
primary key (UID)
);

drop table if exists Workouts;

create table Workouts(
WID int not null auto_increment,
UID int,
type Varchar (100) not null,
duration int(100) not null,
calories int (100) not null,
primary key (WID)
);