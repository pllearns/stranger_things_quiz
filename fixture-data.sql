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
  ('What is Eleven''s favorite food?', 'https://pmctvline2.files.wordpress.com/2016/07/stranger-things-eleven.jpg');

INSERT INTO 
  answers (question_id, answer_text, correct)
VALUES
  ('1', 'Eggos!', 'true')