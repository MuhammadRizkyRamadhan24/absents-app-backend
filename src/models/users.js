const db = require('../helpers/db')
const { promisify } = require('util')
const execPromise = promisify(db.query).bind(db)

const table = 'users'

exports.createUser = (data) => {
  return execPromise(`
  INSERT INTO ${table} (name, email, privileges, password) VALUES (?, ?, ?, ?)
    `, [data.name, data.email, data.privileges, data.password])
}

exports.getUserByEmail = (email, cb) => {
  return execPromise(
    `
    SELECT id, email, name, photo, password, privileges, birth_date FROM ${table} WHERE email = ?
  `,
    [email]
  )
}

exports.getUserByIdUser = (email) => {
  return execPromise(`
  SELECT * FROM ${table} WHERE id = ?
  `, [email])
}

exports.getUserById = (id, cb) => {
  db.query(`
  SELECT * FROM ${table} WHERE id = ?
  `, [id], cb)
}

exports.getUserByName = (search, cb) => {
  db.query(`
  SELECT id, name, photo FROM users WHERE name LIKE '%${search}%'
  `, [search], cb)
}

exports.getPegawaiByName = (search, cb) => {
  db.query(`
  SELECT id, name, photo, email FROM users WHERE privileges = 'pegawai' AND name LIKE '%${search}%'
  `, [search], cb)
}

exports.getUserPassById = (id, cb) => {
  db.query(`
  SELECT password FROM ${table} WHERE id = ?
  `, [id], cb)
}

exports.updateUser = (data, id, cb) => {
  db.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, id], cb)
}