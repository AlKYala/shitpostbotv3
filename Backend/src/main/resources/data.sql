INSERT INTO shitpostdatabase.user(id, is_admin, password,  username) values (100, false, '$2a$10$keqDdlF5Jw2zAq13Oewr6e.LRMmHY29f5KJJX/6nZBSybLv3BdbuK', 'Beispiel');

INSERT INTO shitpostdatabase.image(id, url, poster_id) values (1, 'https://www.shitpostbot.com/img/sourceimages/fries-5fe456d955114.png', 100);
INSERT INTO shitpostdatabase.image(id, url, poster_id) values (2, 'https://www.shitpostbot.com/img/sourceimages/spongebob-washing-machine-5fe1437e5a889.jpeg', 100);
INSERT INTO shitpostdatabase.image(id, url, poster_id) values (3, 'https://www.shitpostbot.com/img/sourceimages/bear-5fca2fbe3a94e.png', 100);

INSERT INTO shitpostdatabase.template(id, base_url, poster_id) values (1, 'https://www.shitpostbot.com/img/templates/hit-and-run-5f594773e8703.png', 100);
INSERT INTO shitpostdatabase.template(id, base_url, poster_id) values (2, 'https://www.shitpostbot.com/img/templates/giorno-what-a-great-view-5ff1003da65d8-overlay.png', 100);
INSERT INTO shitpostdatabase.template(id, base_url, poster_id) values (3, 'https://www.shitpostbot.com/img/templates/not-mario-5fe159ebce0cd.png', 100);


INSERT INTO shitpostdatabase.coordinate(id, x1,x2,y1,y2,reference_id) values(1,195,375,271,487,1);
INSERT INTO shitpostdatabase.coordinate(id, x1,x2,y1,y2,reference_id) values(2,152,720,404,809,2);
INSERT INTO shitpostdatabase.coordinate(id, x1,x2,y1,y2,reference_id) values(3,39,607,232,1014,3);
INSERT INTO shitpostdatabase.coordinate(id, x1,x2,y1,y2,reference_id) values(4,359,468,70,176,3);
