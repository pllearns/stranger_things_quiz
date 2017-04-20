import express from 'express'
const router = express.Router()

import {
  Quiz,
  getAllQuestionsByQuizSession,
  getCorrectAnswers,
  correctCount
} from '../database'

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

router.post( '/:id/results', (request, response, next) => {
  const { id } = request.params
  console.log('a good body:', request.body)
  let percentCorrect = correctCount( request.body )
    if (percentCorrect > 70) {
      response.render('quizzes/bad_results', { percentCorrect })
    } else {
      response.render( 'quizzes/results', { percentCorrect })
    }
})


router.get( '/:id/results2', (request, response) => {
  const { id } = request.params
  console.log(request.body)
  getCorrectAnswers( id )
    .then( results => {
      response.render( 'quizzes/results', { results })
    })
    .catch( error => response.send({ message: error.message }))
})

router.get( '/:id/:questionNumber', (request, response) => {
  const { id, questionNumber } = request.params

  getAllQuestionsByQuizSession()
    .then( questions => response.render( 'quizzes/question', { questions, quiz_session_id: id }))
    .catch( error => response.send({ message: error.message }))
})

router.get('/json', (request, response) => {
  getAllQuestionsByQuizSession()
  .then(data => response.json(data[0]))
})


module.exports = router
