import passport from 'passport'
import bcrypt from 'bcrypt'
import { Strategy } from 'passport-local'
import { User } from '../database'

const AUTH_FIELDS = { usernameField: 'email' }
const FAILURE_MESSAGE = { message: 'Incorrect email or password.' }
const SALT_ROUNDS = 10
const REDIRECTS = {
  successRedirect: '/',
  failureRedirect: '/users/login'
}

const hashPassword = password => {
  return new Promise( (resolve, reject) => {
    bcrypt.hash( password, SALT_ROUNDS, (error, hash) => 
      error ? reject( error ) : resolve( hash )
    )
  })
}

const checkUser = (done, password) => user => {
  user.length === 0 
    ? done( null, false, FAILURE_MESSAGE )
    : hashPassword(password)
      .then( checkPassword(done, password, user))
  }
}

const checkPassword = (done, password, user) => hash => 
  bcrypt.compare(password, hash, (error, result) => 
    result ? done(null, user) : done(null, false, FAILURE_MESSAGE)
  )

const strategy = new Strategy(AUTH_FIELDS, (email, password, done) => {
  User.findByEmail(email)
    .then( checkUser(done, password))
    .catch( error => done(error))
  }
)

passport.use(strategy)

passport.serializeUser((user, done) => {done(null, user[0].id)})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then( user => done(null, user))
    .catch( error => done(error))
})

export { passport as default, REDIRECTS, hashPassword }
