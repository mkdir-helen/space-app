
-- USERS
create table users (
  id serial primary key,
  name text,
  lat float,
  long float,
  username varchar(200) not null,
  pwhash varchar(60) not null,
  google_ID text,
  thumbnail text
);

create table body_types (
    id serial primary key,
    name text
);

create table bodies (
    id serial primary key,
    name text,
    body_type integer references body_types (id)
);

create table body_locations (
    id serial primary key, 
    ra float,
    dec float,
    date date,
    body_id integer references bodies (id)
);

-- EVENTS
-- name
-- completed
create table events (
  id serial primary key,
  name text,
  date date,
  body_id integer references bodies (id),
  user_id integer references users (id)
);

-- create table users_events (
--     user_id integer references users (id),
--     event_id integer references events (id)
-- );

create table friends (
    user_id_a integer references users (id),
    friend_id integer references users (id)
);



create table favorites (
    body_id integer references bodies (id),
    user_id integer references users (id)
);

