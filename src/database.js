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

const createSession = 'INSERT INTO quiz_sessions( user_id ) VALUES ( $1 )'
const getQuizSession = 'SELECT * FROM quiz_sessions WHERE id=$1'
const getAllQuestions = 'SELECT * FROM quiz_session_questions WHERE quiz_session_id=$1'
const getAllAnswers = 'SELECT * FROM answers WHERE question_id=$1'


// createSession
// pipe this (most recent?) session id into next thing
// currentQuestion: copies all existing question id's and correct status and 
// putQuestionsInSession: put into quiz_session_questions 
// getQuestionText: get question text for x question id
// getOneQuestionAnswers: get all answers for x question id
// wrap all this shit up in a parcel and hand it to the front


const Quiz = {
  createSession: (user_id) => db.one( createSession, [ user_id ]),
  getQuizSession: id => db.one( getQuizSession, [ id ]),

  createSessionAndGetQuiz: ()
    return Promise.all(
      createSession(user_id),
      getQuizSession(quiz_session_id)
      )
    .then(results => )

  getAllQuestions: quiz_session_id => db.any( getAllQuestions, [ quiz_session_id ]),
  getAllAnswers: question_id => db.any(getAllAnswers, [ question_id]),
}
export { User, Quiz }
