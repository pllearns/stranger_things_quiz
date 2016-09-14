import express from 'express'
const router = express.Router()

import { Quiz } from '../database'

router.get( '/start', (request, response) => {
  let user_id = request.user[0].id

  console.log('')

  // if( ! request.isAuthenticated() ) {
  //   // TODO: Setup anonymous user
  // } 

  Quiz.createSession( user_id )
    .then( quiz_id => {
      console.log("yay quiz id??", quiz_id)
      response.redirect( `/quiz/${quiz_id}/0` )
    })
    .catch( error => response.send({ message: error.message }))
})

router.get( '/quiz/:id/results', (request, response) => {
  const { id } = request.params

  Quiz.calculateResults( id )
    .then( results => response.render( 'quiz/results', { results }))
    .catch( error => response.send({ message: error.message }))
})

router.get( '/quiz/:id/:questionNumber', (request, response) => {
  const { id, questionNumber } = request.params

  // TODO: Update quiz_session_questions, setting correct and completed
  // Determine value for correct
  // Update question

  // TODO: Get count of questions, and redirect to /quiz/results if at end

  Quiz.getQuestion( id, questionNumber )
    .then( question => response.render( 'quizzes/question', { question }))
    .catch( error => response.send({ message: error.message }))
})

module.exports = router
