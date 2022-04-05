create table if not exists appointments
(
    id      int auto_increment primary key,
    user_id int,
    date    date,
    subject varchar(255),
    slot    int not null,
    foreign key (user_id) references users (id) on delete cascade on update cascade
);


