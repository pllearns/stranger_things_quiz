import pgp from 'pg-promise'

const db = pgp()({
  database: 'stranger_quiz'
})

const findUserById = 'SELECT * FROM users WHERE id=$1'
const findUserByEmail = 'SELECT * FROM users WHERE email=$1 LIMIT 1'
const findUserByEmailAndPassword = 'SELECT * FROM users WHERE email=$1 AND password=$2'
const createUser = 'INSERT INTO users( name, email, password ) VALUES ( $1, $2, $3 ) RETURNING *'

const User = {
  findById: id => db.any( findUserById, [ id ]),
  findByEmail: email => db.any( findUserByEmail, [ email ]),
  findByEmailAndPassword: (email, password) =>
    db.any( findUserByEmailAndPassword, [ email, password ]),
  create: (name, email, password) => db.one( createUser, [ name, email, password ])
}

export { User }
