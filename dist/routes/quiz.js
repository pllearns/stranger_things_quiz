'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _database = require('../database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/start', function (request, response) {
  var user_id = request.user[0].id;

  if (!request.isAuthenticated()) {
    // TODO: Setup anonymous user
  }

  _database.Quiz.createSession(user_id).then(function (quiz_id) {
    return response.redirect('/quiz/' + quiz_id.id + '/0');
  }).catch(function (error) {
    return response.send({ message: error.message });
  });
});

router.post('/:id/results', function (request, response, next) {
  var id = request.params.id;


  (0, _database.correctCount)(request.body).then(function (percentCorrect) {
    return response.redirect('/quiz/' + id + '/results2', {
      percentCorrect: percentCorrect
    });
  }).catch(function (error) {
    return response.send({ message: error.message });
  });
});

router.get('/:id/results2', function (request, response) {
  var id = request.params.id;

  console.log(request.body);

  (0, _database.getCorrectAnswers)(id).then(function (results) {
    return response.render('quizzes/results', { results: results });
  }).catch(function (error) {
    return response.send({ message: error.message });
  });
});

router.get('/:id/:questionNumber', function (request, response) {
  var _request$params = request.params,
      id = _request$params.id,
      questionNumber = _request$params.questionNumber;

  // TODO: Update quiz_session_questions, setting correct and completed
  // Determine value for correct
  // Update question

  // TODO: Get count of questions, and redirect to /quiz/results if at end

  (0, _database.getAllQuestionsByQuizSession)().then(function (questions) {
    return response.render('quizzes/question', {
      questions: questions, quiz_session_id: id
    });
  }).catch(function (error) {
    return response.send({ message: error.message });
  });
});

router.get('/json', function (request, response) {
  (0, _database.getAllQuestionsByQuizSession)().then(function (data) {
    return response.json(data[0]);
  });
});

module.exports = router;