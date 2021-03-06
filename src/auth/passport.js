import passport from 'passport'
import bcrypt from 'bcrypt'
import { Strategy } from 'passport-local'

import { User } from '../database'

const SALT_ROUNDS = 10
const AUTH_FIELDS = { usernameField: 'email' }
const REDIRECTS = {
  successRedirect: '/',
  failureRedirect: '/users/login'
}
const FAILURE_MESSAGE = { message: 'Incorrect email or password.' }

const hashPassword = password => {
  return new Promise( (resolve, reject) => {
    bcrypt.hash( password, SALT_ROUNDS, (error, hash) => {
      if( error ) {
        reject( error )
      } else {
        resolve( hash )
      }
    })
  })
}

const checkUser = (done, password) => user => {
  if( user.length === 0 ) {
    return done( null, false, FAILURE_MESSAGE )
  } else {
    hashPassword( password )
    .then( checkPassword( done, password, user) )
  }
}

const checkPassword = (done, password, user) => hash => {
  bcrypt.compare( password, hash, (error, result) => {
    if( result ) {
      return done( null, user )
    } else {
      return done( null, false, FAILURE_MESSAGE )
    }
  })
}



const strategy = new Strategy( AUTH_FIELDS, (email, password, done) => {
  User.findByEmail( email )
    .then( checkUser( done, password ) )
    .catch( error => done( error ))
  }
)

passport.use( strategy )

passport.serializeUser( (user, done) => {
  done( null, user[0].id )
})

passport.deserializeUser( (id, done) => {
  User.findById( id )
    .then( user => done( null, user ))
    .catch( error => done( error ))
})

export { passport as default, REDIRECTS, hashPassword }
