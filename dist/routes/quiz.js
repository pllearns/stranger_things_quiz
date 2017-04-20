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
    response.redirect('/quiz/' + quiz_id.id + '/0');
  }).catch(function (error) {
    return response.send({ message: error.message });
  });
});

router.post('/:id/results', function (request, response, next) {
  var id = request.params.id;

  console.log('a good body:', request.body);
  var percentCorrect = (0, _database.correctCount)(request.body);
  if (percentCorrect > 70) {
    response.render('quizzes/bad_results', { percentCorrect: percentCorrect });
  } else {
    response.render('quizzes/results', { percentCorrect: percentCorrect });
  }
});

router.get('/:id/results2', function (request, response) {
  var id = request.params.id;

  console.log(request.body);
  (0, _database.getCorrectAnswers)(id).then(function (results) {
    response.render('quizzes/results', { results: results });
  }).catch(function (error) {
    return response.send({ message: error.message });
  });
});

router.get('/:id/:questionNumber', function (request, response) {
  var _request$params = request.params,
      id = _request$params.id,
      questionNumber = _request$params.questionNumber;


  (0, _database.getAllQuestionsByQuizSession)().then(function (questions) {
    return response.render('quizzes/question', { questions: questions, quiz_session_id: id });
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