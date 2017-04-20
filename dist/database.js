'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.correctCount = exports.getAllQuestionsByQuizSession = exports.Quiz = exports.User = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _pgPromise = require('pg-promise');

var _pgPromise2 = _interopRequireDefault(_pgPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionSetting = {
  database: 'stranger_quiz'
};

if (process.env.NODE_ENV !== 'development') {
  connectionSetting = {
    host: 'ec2-54-235-108-156.compute-1.amazonaws.com',
    database: 'dah0mroilv01s5',
    user: 'aclrzvavsyseua',
    password: '-AUucgCDeU1WC4MDKbNNLs6pET'
  };
}

var db = (0, _pgPromise2.default)()(connectionSetting);

var findUserById = 'SELECT * FROM users WHERE id=$1';
var findUserByEmail = 'SELECT * FROM users WHERE email=$1 LIMIT 1';
var findUserByEmailAndPassword = 'SELECT * FROM users WHERE email=$1 AND password=$2';
var createUser = 'INSERT INTO users( name, email, password ) VALUES ( $1, $2, $3 ) RETURNING *';

var User = {
  findById: function findById(id) {
    return db.any(findUserById, [id]);
  },
  findByEmail: function findByEmail(email) {
    return db.any(findUserByEmail, [email]);
  },
  findByEmailAndPassword: function findByEmailAndPassword(email, password) {
    return db.any(findUserByEmailAndPassword, [email, password]);
  },
  create: function create(name, email, password) {
    return db.one(createUser, [name, email, password]);
  }
};

var _createSession = 'INSERT INTO quiz_sessions( user_id ) VALUES ( $1 ) RETURNING quiz_sessions.id';
var _getQuizSession = 'SELECT * FROM quiz_sessions WHERE id=$1';
var _getQuestion = 'SELECT * FROM questions WHERE id IN ($1:csv)';
var _getAllQuestions = 'SELECT * FROM questions';
var _getAllAnswers = 'SELECT answers.*, question_id FROM answers WHERE question_id IN ($1:csv)';
var getCorrectAnswer = 'SELECT answers.*, question_id FROM answers WHERE question_id IN (1, 2, 3) AND correct=true';
// const getOneQuestAnswer = 'SELECT * FROM answers WHERE question_id=$1'


var Quiz = {
  createSession: function createSession(user_id) {
    return db.one(_createSession, [user_id]);
  },
  getQuizSession: function getQuizSession(id) {
    return db.one(_getQuizSession, [id]);
  },
  getAllQuestions: function getAllQuestions(question_id) {
    return db.any(_getAllQuestions, [question_id]);
  },
  getQuestion: function getQuestion(quiz_session_id) {
    return db.any(_getQuestion, [quiz_session_id]);
  },
  getAllAnswers: function getAllAnswers(question_id) {
    return db.any(_getAllAnswers, [question_id]);
  },
  getOneQuestAnswer: function (_getOneQuestAnswer) {
    function getOneQuestAnswer(_x) {
      return _getOneQuestAnswer.apply(this, arguments);
    }

    getOneQuestAnswer.toString = function () {
      return _getOneQuestAnswer.toString();
    };

    return getOneQuestAnswer;
  }(function (question_id) {
    return db.any(getOneQuestAnswer, [question_id]);
  }),
  getCorrectAnswers: function getCorrectAnswers(question_id) {
    return db.any(getCorrectAnswer, [question_id]);
  }
};

// refactor so that one question and answer set is retrieved at a time
// refactor so that quiz_session_questions is used and we can have multiple quizzes/adding questions)


var getAllQuestionsByQuizSession = function getAllQuestionsByQuizSession() {
  return Quiz.getAllQuestions().then(function (questions) {
    var questionIds = questions.map(function (question) {
      return question.id;
    });
    return Promise.all([Quiz.getAllAnswers(questionIds)]).then(function (data) {
      var _data = _slicedToArray(data, 1),
          answers = _data[0];

      questions.forEach(function (question) {
        question.answers = answers.filter(function (answer) {
          return answer.question_id === question.id;
        });
      });
      return questions;
    });
  });
};

var correctCount = function correctCount(answers) {
  var correctAnswers = 0;
  var totalAnswers = Object.keys(answers).length;
  for (var i = 0; i <= totalAnswers; i++) {
    if (answers[i] === 'true') {
      correctAnswers += 1;
    }
  }
  var percentCorrect = Math.floor(correctAnswers / totalAnswers * 100);
  return percentCorrect;
};

exports.User = User;
exports.Quiz = Quiz;
exports.getAllQuestionsByQuizSession = getAllQuestionsByQuizSession;
exports.correctCount = correctCount;