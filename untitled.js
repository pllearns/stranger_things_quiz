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
const getQuestion = 'SELECT * FROM quiz_session_questions WHERE quiz_session_id=$1 AND question_id=$2'
const getAllQuestions = 'SELECT * FROM questions WHERE id=$1'
const getAnswers = 'SELECT * FROM answers WHERE question_id=$1'
// const allQuestionsInSession = `SELECT 
//       questions.*,
//       quiz_session_questions.question_id
//     FROM 
//       questions
//     LEFT JOIN 
//       quiz_session_questions
//     ON 
//       questions.id=quiz_session_questions.question_id
//     WHERE
//       quiz_session_questions.quiz_id IN ($1:csv)`


// getSessionQuestions: copies all existing question id's and correct status 
// getQuestionText: get question text for x question id
// getOneQuestionAnswers: get all answers for x question id
// wrap all this shit up in a parcel and hand it to the front


const Quiz = {
  createSession: (user_id) => db.one( createSession, [ user_id ]),
  getQuizSession: id => db.one( getQuizSession, [ id ]),
  getAllQuestions: question_id => db.any( getAllQuestions, [ question_id ]),
  getQuestion: quiz_session_id => db.any( getQuestion, [ quiz_session_id ]),
  getAnswers: question_id => db.any(getAllAnswers, [ question_id]),
}

const getAllQuestionsByQuizSession
  return getAllQuestions().then(questions => {
    const questionIds = questions.map(question => question.id)

    return Promise.all([
      getAnswers(questionIds),
      getQuestion(questionIds),
    ]).then(data => {
      console.log(data)
    })
    return questions
  })
export { User, Quiz }