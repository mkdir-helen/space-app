

insert into users
    (name, location, username)
values
    ('Jeff', 'Seattle, WA', 'Jeff'),
    ('Mike','Denver, Co', 'Mike'),
    ('Jerry', 'Cleveland, OH', 'Jerry'),
    ('Fabio', 'Rio de Janiero, Brazl', 'Fabio'),
    ('Flavio', 'Milan, Italy', 'Flavio');

insert into events 
    (name, date)
values
    ('solar eclipse', '2018-11-20'),
    ('comet shower', '2019-03-15'),
    ('Jupiter visible', '2018-12-31'),
    ('Mars visible', '2019-05-05'),
    ('full moon', '2019-10-09');


insert into bodies
    (name)
values
    ('sun'),
    ('comets'),
    ('Jupiter'),
    ('Mars'),
    ('constellation'),
    ('moon');

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

