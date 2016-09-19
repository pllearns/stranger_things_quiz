'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPassword = exports.REDIRECTS = exports.default = undefined;

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _passportLocal = require('passport-local');

var _database = require('../database');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SALT_ROUNDS = 10;
var AUTH_FIELDS = { usernameField: 'email' };
var REDIRECTS = {
  successRedirect: '/',
  failureRedirect: '/users/login'
};
var FAILURE_MESSAGE = { message: 'Incorrect email or password.' };

var hashPassword = function hashPassword(password) {
  return new Promise(function (resolve, reject) {
    _bcrypt2.default.hash(password, SALT_ROUNDS, function (error, hash) {
      if (error) {
        reject(error);
      } else {
        resolve(hash);
      }
    });
  });
};

var checkUser = function checkUser(done, password) {
  return function (user) {
    if (user.length === 0) {
      return done(null, false, FAILURE_MESSAGE);
    } else {
      hashPassword(password).then(checkPassword(done, password, user));
    }
  };
};

var checkPassword = function checkPassword(done, password, user) {
  return function (hash) {
    _bcrypt2.default.compare(password, hash, function (error, result) {
      if (result) {
        return done(null, user);
      } else {
        return done(null, false, FAILURE_MESSAGE);
      }
    });
  };
};

var strategy = new _passportLocal.Strategy(AUTH_FIELDS, function (email, password, done) {
  _database.User.findByEmail(email).then(checkUser(done, password)).catch(function (error) {
    return done(error);
  });
});

_passport2.default.use(strategy);

_passport2.default.serializeUser(function (user, done) {
  done(null, user[0].id);
});

_passport2.default.deserializeUser(function (id, done) {
  _database.User.findById(id).then(function (user) {
    return done(null, user);
  }).catch(function (error) {
    return done(error);
  });
});

exports.default = _passport2.default;
exports.REDIRECTS = REDIRECTS;
exports.hashPassword = hashPassword;