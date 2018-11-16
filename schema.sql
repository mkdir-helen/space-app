
-- USERS
create table users (
  id serial primary key,
  name text,
  location text,
  google_ID text,
  thumbnail text,
  username varchar(200)
--   pwhash varchar(60)
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

