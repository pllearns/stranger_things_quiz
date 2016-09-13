import pgp from 'pg-promise'

const db = pgp()({
  database: 'stranger_quiz'
})

const findUserById = 'SELECT * FROM users WHERE id=$1'
const findUserByEmail = 'SELECT * FROM users WHERE email=$1 LIMIT 1'
const findUserByEmailAndPassword = 'SELECT * FROM users WHERE email=$1 AND password=$2'
const createUser = 'INSERT INTO users( name, email, password ) VALUES ( $1, $2, $3 ) RETURNING *'


const User = {
  findById: id => db.any( findUserById, [ id ]),
  findByEmail: email => db.any( findUserByEmail, [ email ]),
  findByEmailAndPassword: (email, password) =>
    db.any( findUserByEmailAndPassword, [ email, password ]),
  create: (name, email, password) => db.one( createUser, [ name, email, password ])
}

const createNewQuizSession = 'INSERT INTO quiz_session( user_id, started_at ) VALUES ( $1, $2 ) LIMIT 1'
const getQuizSession = 'SELECT * FROM quiz_sessions WHERE id=$1'
const getAllQuestions = 'SELECT * FROM quiz_session_questions WHERE quiz_session_id=$1'
const getAllAnswers = 'SELECT * FROM answers WHERE question_id=$1'
const getCorrectAnswer = 'SELECT * FROM answers WHERE correct=true AND question_id=$1 LIMIT 1'

const Quiz = {
  createNewQuizSession: (user_id, started_at) => db.anyOrOne( createNewQuizSession, [ user_id, started_at]),
  getQuizSession: id => db.one( getQuizSession, [ id ]),
  getAllQuestions: quiz_session_id => db.any( getAllQuestions, [ quiz_session_id ]),
  getAllAnswers: question_id => db.any(getAllAnswers, [ question_id]),
  getCorrectAnswer: (question_id) => db.one(getCorrectAnswer, [question_id]),


}
export { User, Quiz }
