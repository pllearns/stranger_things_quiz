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
const getCorrectAnswer = 'SELECT answers.*, question_id FROM answers WHERE question_id IN (1, 2, 3) AND correct=true'
// const getOneQuestAnswer = 'SELECT * FROM answers WHERE question_id=$1'


const Quiz = {
  createSession: (user_id) => db.one( createSession, [ user_id ]),
  getQuizSession: id => db.one( getQuizSession, [ id ]),
  getAllQuestions: question_id => db.any( getAllQuestions, [ question_id ]),
  getQuestion: quiz_session_id => db.any( getQuestion, [ quiz_session_id ]),
  getAllAnswers: question_id => db.any(getAllAnswers, [ question_id]),
  getOneQuestAnswer: question_id => db.any(getOneQuestAnswer, [ question_id ]),
  getCorrectAnswers: question_id => db.any( getCorrectAnswer, [ question_id ] )
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
      return questions
    })
  })
}

// const getScore = () => {
//   console.log('this is the score?')
//   let score = 0
//   return score
// }

let sessionAnswers = new Array()
// make this auto? add it in a function with looping and getting data from the database
sessionAnswers["Eggos"] = 1
sessionAnswers["Pancakes"] = 0
sessionAnswers["The Upside Down"] = 1
sessionAnswers["The Entryway"] = 0
sessionAnswers["Hawkins, IN"] = 1
sessionAnswers["Oakland, CA"] = 0

// const getRightAnswer = () => {
//   console.log('===================wat')
//   let isItRight = 0
//   let theForm = document.forms["quiz-form"]
//   let selectedAnswer = theForm.elements["eggo1"] // does this need to change? do we need to do more to call this here???
//   for(var i = 0; i < selectedAnswer.length; i++){
//     if(selectedAnswer[i].checked){
//       isItRight = sessionAnswers[selectedAnswer[i].value]
//       break
//     }
//   }
//   return isItRight
// }

// const getTotal = () => {
//   let totalScore += getRightAnswer()
//   console.log(totalScore)
// }

//looking to pull which thing was clicked from form
//get data for what I"m looking for

const correctCount = answers => {
  let correctAnswers = 0
  let totalAnswers = Object.keys(answers).length
  for(let i = 0; i <= totalAnswers; i++){
    if ( answers[i] === 'true'){
      correctAnswers += 1
    }
  }
  let percentCorrect = Math.floor((correctAnswers / totalAnswers) * 100)
  return percentCorrect
} 


export { User, Quiz , getAllQuestionsByQuizSession, correctCount}


//some ideas for counting score
    // for (let i = 0; i < answers.length; i++) {
    //     let currentQuestion = ;
    //     let questionAnswers = document.getElementsByName(currentQuestion);
    //     for (let j = 0; j < questionResponses.length; j++) {
    //         if (questionResponses[i].checked) {
    //             userInput[i] = question0s[i].value;
    //         }
    //     }
    // }
    // let score = 0
    // // after this completes, you'll have the user input values
    // // the rest of your code should now work
    // for (let i=0;i<numQuestions;i++){
    //     if (userInput[i]==answers[i]){
    //         score += 1;
    //     } else {
    //         score += 0;
    //     }
    // }
    //
    // return score;
