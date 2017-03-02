'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _cookieSession = require('cookie-session');

var _cookieSession2 = _interopRequireDefault(_cookieSession);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _gravatar = require('gravatar');

var _gravatar2 = _interopRequireDefault(_gravatar);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _pgPromise = require('pg-promise');

var _pgPromise2 = _interopRequireDefault(_pgPromise);

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

var _passport = require('./auth/passport');

var _passport2 = _interopRequireDefault(_passport);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _users = require('./routes/users');

var _users2 = _interopRequireDefault(_users);

var _quiz = require('./routes/quiz');

var _quiz2 = _interopRequireDefault(_quiz);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// app.get('env') === process.env.NODE_ENV || 'development'

app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.set('trust proxy', 1);

app.set('port', process.env.PORT || 3000);
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
// app.use(express.json())
app.use((0, _cookieParser2.default)());
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
app.use((0, _expressSession2.default)({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

app.use((0, _morgan2.default)('common'));

app.use('/', _index2.default);
app.use('/users', _users2.default);
app.use('/quiz', _quiz2.default);

app.listen(app.get('port'), function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;