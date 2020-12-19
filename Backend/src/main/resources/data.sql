INSERT INTO shitpostdatabase.user(id, is_admin, password,  username) values (100, false, '$2a$10$I2CQDabFNqh7XgvolWstjeQkJmJykNcFtfQTwlGRxVS5UMbLhile.', 'Sample')

INSERT INTO shitpostdatabase.image(id, url, poster_id) values (1, 'https://fujifilm-x.com/wp-content/uploads/2019/08/x-t30_sample-images02.jpg', 100)

INSERT INTO shitpostdatabase.template(id, base_url, poster_id) values (1, 'https://fujifilm-x.com/wp-content/uploads/2019/08/x-t3_sample-images01.jpg', 100)

INSERT INTO shitpostdatabase.coordinate(id, x1,x2,y1,y2,reference_id) values(1, 150, 350, 750, 800, 1)