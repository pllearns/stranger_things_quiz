'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _passport = require('../auth/passport');

var _passport2 = _interopRequireDefault(_passport);

var _database = require('../database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/signup', function (request, response, next) {
  response.render('users/signup');
});

router.post('/signup', function (request, response, next) {
  var _request$body = request.body;
  var name = _request$body.name;
  var email = _request$body.email;
  var password = _request$body.password;


  (0, _passport.hashPassword)(password).then(function (hash) {
    return _database.User.create(name, email, hash);
  }).then(function (user) {
    return request.login(user, function (error) {
      if (error) {
        Promise.reject(error);
      } else {
        response.redirect('/');
      }
    });
  }).catch(function (error) {
    console.log(error);
    response.redirect('/');
  });
});

router.get('/login', function (request, response, next) {
  response.render('users/login');
});

router.post('/login', _passport2.default.authenticate('local', _passport.REDIRECTS));

router.get('/logout', function (request, response, next) {
  request.logout();
  response.redirect('/');
});

module.exports = router;