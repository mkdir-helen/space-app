

insert into users
    (name, lat, long, username, pwhash)
values
-- seed with buckhead, ga coordinates
-- 33.83942°N 84.37992°W
    ('Flavio', 33.83, -84.34, 'Flavio', 'dasdsfsdfaS'),
    ('Jeff', 33.83, -84.34, 'Jeff', 'asdasd232'),
    ('Mike', 33.83, -84.34, 'Mike', 'adfadfad'),
    ('Jerry', 33.83, -84.34, 'Jerry', 'asfasdasd'),
    ('Fabio', 33.83, -84.34, 'Fabio', 'afadfadasd');

insert into body_types
    (name)
values
    ('star'),
    ('planet'),
    ('comet'),
    ('asteroid'),
    ('satellite'),
    ('artificial satellite'),
    ('constellation'),
    ('meteor shower'),
    ('galaxy');

insert into bodies
    (name)
values
    ('Weather'),
    ('Sun'),
    ('Mercury'),
    ('Venus'),
    ('Moon'),
    ('Mars'),
    ('Jupiter'),
    ('Saturn'),
    ('Uranus'),
    ('Neptune'),
    ('Pluto'),
    ('Hale-Bopp'),
    ('Orion'),
    ('Andromeda'),
    ('Big Dipper'),
    ('Perseids'),
    ('North Star');

insert into events 
    (name, date, body_id, user_id)
values
    ('solar eclipse', '2018-11-20', 5, 1),
    ('meteor shower', '2019-03-15', 11, 2),
    ('Jupiter visible', '2018-12-31', 3, 3),
    ('Mars visible', '2019-05-05', 4, 4),
    ('full moon', '2019-10-09', 5, 5);

insert into friends 
    (user_id_a, friend_id)
values
    (1, 2),
    (2, 1),
    (3, 1),
    (1, 3),
    (1, 4),
    (4, 1),
    (2, 3),
    (3, 2),
    (2, 4),
    (4, 2),
    (3, 4),
    (4, 3);

insert into favorites
    (body_id, user_id)
values
    (1, 2),
    (1 ,5),
    (2, 1),
    (2, 3),
    (3, 5),
    (4, 5),
    (5, 1),
    (5, 3),
    (5, 5);

