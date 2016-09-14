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
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  anonymous BOOLEAN DEFAULT false
);

CREATE TABLE quiz_sessions
(
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quiz_session_questions
(
  id SERIAL PRIMARY KEY,
  quiz_session_id INTEGER NOT NULL,
  question_id INTEGER NOT NULL,
  correct BOOLEAN DEFAULT false,
  completed BOOLEAN DEFAULT false
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
