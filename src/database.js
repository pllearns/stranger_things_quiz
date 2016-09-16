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

const createSession = 'INSERT INTO quiz_sessions( user_id ) VALUES ( $1 ) RETURNING quiz_sessions.id'
const getQuizSession = 'SELECT * FROM quiz_sessions WHERE id=$1'
const getQuestion = 'SELECT * FROM questions WHERE id IN ($1:csv)'
const getAllQuestions = 'SELECT * FROM questions'
const getAllAnswers = 'SELECT answers.*, question_id FROM answers WHERE question_id IN ($1:csv)'
// const getOneQuestAnswer = 'SELECT * FROM answers WHERE question_id=$1'


const Quiz = {
  createSession: (user_id) => db.one( createSession, [ user_id ]),
  getQuizSession: id => db.one( getQuizSession, [ id ]),
  getAllQuestions: question_id => db.any( getAllQuestions, [ question_id ]),
  getQuestion: quiz_session_id => db.any( getQuestion, [ quiz_session_id ]),
  getAllAnswers: question_id => db.any(getAllAnswers, [ question_id]),
  getOneQuestAnswer: question_id => db.any(getOneQuestAnswer, [ question_id ])
}

// refactor so that one question and answer set is retrieved at a time
// refactor so that quiz_session_questions is used and we can have multiple quizzes/adding questions)


const getAllQuestionsByQuizSession = () => {
  return Quiz.getAllQuestions().then( questions => {
    const questionIds = questions.map(question => question.id)
    return Promise.all([ Quiz.getAllAnswers(questionIds )])
    .then(data => {

      const [ answers ] = data

      questions.forEach( question => {
        question.answers = answers.filter(answer => answer.question_id === question.id)
      })
      console.log(questions[1].answers[0].answer_text);
      return questions
    })
  })
}





export { User, Quiz , getAllQuestionsByQuizSession }

// const getAllQuestionsByQuizSession = () => {
//   return Quiz.getAllQuestions().then( questions => {
//     const questionIds = questions.map(question => question.id)
//
//     return Promise.all([
//       Quiz.getQuestion(questionIds),
//       Quiz.getAllAnswers(questionIds)
//     ]).then(data => {
//       const questions = data[0]
//       const answers = data[1]
//       let questionAnswers = questions.map( question => {
//         let questionId = question.id
//         let allAnswers = Quiz.getOneQuestAnswer(questionId)
//         .then(getAnswerSet => {
//           answers.map( answer => {
//             let questionAnswer = answer.id
//             if( answer.question_id === question.id ) {
//               question.answers = [...questionAnswer]
//             }
//           })
//         })
//       })
//       console.log(data);
//       return data
//     })
//   })
// }




// const individualQuizQuestAndAns = []
// const questionAnswers = questions.map(question => {
//   const q_id = question.id
//   individualQuizQuestAndAns.push( question )
//   for each (q_id){
//     answers.map(answer => {
//       if (answer.question_id === q_id) {
//       individualQuizQuestAndAns.push(answer.question_id)
//       }
//     })
//   }
// })
