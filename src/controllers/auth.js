const userModel = require('../models/users')
const { response: standardResponse } = require('../helpers/standardResponse')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
  const { email, password } = req.body
  const results = await userModel.getUserByEmail(email)
  if (results.length < 1) {
    return standardResponse(res, 401, false, 'Email not found')
  }
  const user = results[0]
  const compare = await bcrypt.compare(password, user.password)
  if (compare) {
    const token = jwt.sign({ id: user.id, email: user.email, privileges: user.privileges }, process.env.APP_KEY)
    return standardResponse(res, 200, true, 'Login Success', { token, privileges: user.privileges })
  } else {
    return standardResponse(res, 401, false, 'Wrong Email or Password!')
  }
}

exports.register = async (req, res) => {
  const data = req.body
  data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())
  const setData = {
    ...data,
    privileges: 'pegawai'
  }
  await userModel.createUser(setData)
  return standardResponse(res, 200, true, 'Register SuccesFully, You can Login Now')
}