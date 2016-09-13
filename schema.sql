-- CREATE TABLES
-- 
-- psql stranger_quiz < schema.sql
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS quiz_sessions;
DROP TABLE IF EXISTS quiz_session_questions;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE quiz_sessions
(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  started_at TIMESTAMP
);

CREATE TABLE quiz_session_questions
(
  id SERIAL PRIMARY KEY,
  quiz_session_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,
  correct BOOLEAN
);

CREATE TABLE questions
(
  id SERIAL PRIMARY KEY,
  question_text TEXT NOT NULL,
  img_url VARCHAR(255) NOT NULL
);

CREATE TABLE answers
(
  id SERIAL PRIMARY KEY,
  question_id INTEGER NOT NULL,
  answer_text VARCHAR(255) NOT NULL,
  correct BOOLEAN
);
