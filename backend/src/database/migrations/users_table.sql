create table if not exists users
(
    id         int auto_increment primary key,
    lastName   varchar(255),
    firstName  varchar(255),
    birthdate  date,
    profession varchar(255),
    authKey    varchar(255) unique
)