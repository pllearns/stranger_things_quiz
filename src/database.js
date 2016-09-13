import pgp from 'pg-promise'

const db = pgp()({
  database: 'stranger_quiz'
})

const findById = 'SELECT * FROM users WHERE id=$1'
const findUserByEmailAndPassword = 'SELECT * FROM users WHERE email=$1 AND password=$2'
const createUser = 'INSERT INTO users( name, email, password ) VALUES ( $1, $2, $3 )'

const User = {
  findById: id => db.any( findUserById, [ id ]),
  findByEmailAndPassword: (email, password) =>
    db.any( findUserByEmailAndPassword, [ email, password ])
  create: (name, email, password) => db.one( createUser, [ name, email, password ])
}

export default { User }
