
-- USERS
create table users (
  id serial primary key,
  name text,
  location text,
  username varchar(200) not null,
  pwhash varchar(60) not null
);


create table bodies (
    id serial primary key,
    name text
);


-- EVENTS
-- name
-- completed
create table events (
  id serial primary key,
  name text,
  date date,
  body_id integer references bodies (id)
);



create table friends (
    user_id_a integer references users (id),
    friend_id integer references users (id)
);



create table favorites (
    body_id integer references bodies (id),
    user_id integer references users (id)
);

