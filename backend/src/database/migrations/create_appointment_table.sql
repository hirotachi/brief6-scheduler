create table if not exists appointments
(
    id      int auto_increment primary key,
    user_id int,
    date    datetime unique,
    subject varchar(255),
    foreign key (user_id) references users (id)
);
