import express from 'express'
import bcrypt from 'bcrypt'
const router = express.Router()

import passport, {REDIRECTS, hashPassword} from '../auth/passport'
import {User} from '../database'

router.get('/signup', (request, response, next) => {
  response.render('users/signup')
})

router.post('/signup', (request, response, next) => {
  const {name, email, password } = request.body

  hashPassword(password)
    .then(hash => User.create(name, email, hash))
    .then(user => request.login(user, error => response.redirect('/')))
    .catch(error => response.send({message: error.message}))
  })
})

router.get( '/login', (request, response, next) => {
  response.render( 'users/login' )
})

router.post( '/login', passport.authenticate( 'local', REDIRECTS ))

router.get( '/logout', (request, response, next) => {
  request.logout()
  response.redirect( '/' )
})

module.exports = router
