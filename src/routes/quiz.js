import express from 'express'
const router = express.Router()
import { Quiz } from '../database'

router.get('/:quiz_id', (request, response, next) => {
  Quiz.getAllQuestions(request.params.quiz_id)
  .then(result => Quiz.getAllAnswers(result[0].question_id))
  // .then(result => response.json(result.question_id))
  .then(result => response.json(result))
  .catch( error => response.send({ error, message: error.message }))
})

router.post('/:quiz_id', (request, response, next) => {
  Quiz.getQuizSession
})

module.exports = router
