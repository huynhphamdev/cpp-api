const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateJwt = (data, expiresIn) => {
  const token = jwt.sign(
    data,
    process.env.ADMIN_SECRET,
    {
      expiresIn,
    },
  )

  return {
    token,
    data: jwt.decode(token),
  }
}

const verifyJwt = token => jwt.verify(token, process.env.ADMIN_SECRET)

const hash = (val) => {
  const salt = bcrypt.genSaltSync(5)
  return bcrypt.hashSync(val, salt)
}

const compareHash = (attempt, hash) => {
  return bcrypt.compareSync(attempt, hash)
}

module.exports = {
  generateJwt,
  verifyJwt,
  hash,
  compareHash,
}
