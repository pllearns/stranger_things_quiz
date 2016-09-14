--psql stranger_quiz < fixture-data.sql
INSERT INTO
  users (name, email, password)
VALUES
  ('eleven', 'eleven@hawkins.edu', 'mouthbreather');

INSERT INTO
  quiz_sessions (user_id, started_at)
VALUES
  ('1', '2016-09-01, 11:11:11');

INSERT INTO
  quiz_session_questions (quiz_session_id, question_id, correct)
VALUES
  ('1', '1', 'false');

INSERT INTO
  questions (question_text, img_url)
VALUES
  ( 
    'What is Elevens favorite food?', 
    'https://pmctvline2.files.wordpress.com/2016/07/stranger-things-eleven.jpg'
  ),
  (
    'What is the name of the place where Will and Barb ended up?', 
    'http://vignette3.wikia.nocookie.net/strangerthings8338/images/8/8b/TheMonsterEpisode.jpg/revision/latest?cb=20160819171436'
  ),
  (
    'Where does Stranger Things take place?', 
    'http://media.architecturaldigest.com/photos/57a3b7be4cd107bb4fa4c3b7/master/w_806/stranger-things-filming-locations-004.jpg'
  );

INSERT INTO
  answers (question_id, answer_text, correct)
VALUES
  ('1', 'Eggos', 'true'),
  ('1', 'Pancakes', 'false'),
  ('1', 'Bacon', 'false'),
  ('1', 'Apple Pie', 'false'),
  ('1', 'Hamburger', 'false'),
  ('2', 'Purgatory', 'false'),
  ('2', 'The Dark Side', 'false'),
  ('2', 'The Upside Down', 'true'),
  ('2', 'The Entryway', 'false'),
  ('2', 'The Mucky Place', 'false'),
  ('3', 'Bloomington, IN', 'false'),
  ('3', 'Hattonfield, IN', 'false'),
  ('3', 'Alberquerque, NM', 'false'),
  ('3', 'Hawkins, IN', 'true'),
  ('3', 'Oakland, CA', 'false');
