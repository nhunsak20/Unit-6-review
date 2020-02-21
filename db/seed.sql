create table users (
    user_id serial primary key,
    user_email varchar(100),
    user_password varchar(250)
);

create table if not exists post (
    post_id serial primary key,
    user_id integer references users(user_id),
    text varchar(250),
    p_time date
);