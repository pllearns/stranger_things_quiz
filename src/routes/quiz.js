import express from 'express'
const router = express.Router()

import { Quiz, getAllQuestionsByQuizSession, getScore } from '../database'

router.get( '/start', (request, response) => {
  let user_id = request.user[0].id

  if( ! request.isAuthenticated() ) {
    // TODO: Setup anonymous user
  }

  Quiz.createSession( user_id )
    .then( quiz_id => {
      response.redirect( `/quiz/${quiz_id.id}/0` )
    })
    .catch( error => response.send({ message: error.message }))
})

router.get( '/:id/results', (request, response) => {
  const { id } = request.params
  console.log('is this ----------->', request.query);
  getScore()
    .then( results => response.render( 'quizzes/results', { results }))
    .catch( error => response.send({ message: error.message }))
})

router.get( '/:id/:questionNumber', (request, response) => {
  const { id, questionNumber } = request.params

  // TODO: Update quiz_session_questions, setting correct and completed
  // Determine value for correct
  // Update question

  // TODO: Get count of questions, and redirect to /quiz/results if at end

  getAllQuestionsByQuizSession()
    .then( questions => response.render( 'quizzes/question', { questions, quiz_session_id: id }))
    .catch( error => response.send({ message: error.message }))
})

router.get('/json', (request, response) => {
  getAllQuestionsByQuizSession()
  .then(data => response.json(data[0]))
})


module.exports = router
