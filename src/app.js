import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import bodyParser from 'body-parser'
import gravatar from 'gravatar'
import session from 'express-session'
import logger from 'morgan'
import pgp from 'pg-promise'

import database from './database'
import passport from './auth/passport'
import index from './routes/index'
import users from './routes/users'
import quiz from './routes/quiz'

const app = express()

app.get('env') === process.env.NODE_ENV || 'development'
app.get('/db', => (request, response) {
  pgp.connect(process.env.DATABASE_URL)
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.set('trust proxy', 1)

app.set('port', (process.env.PORT || 3000))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('common'))

app.use('/', index)
app.use('/users', users)
app.use('/quiz', quiz)

app.listen(app.get('port'), () => {
  console.log('Example app listening on port 3000!');
})

module.exports = app
