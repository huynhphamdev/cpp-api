const { verifyJwt } = require('../services/auth')

const throwUnauthorized = (res) => {
  res.status(401)
  throw new Error('10001')
}

const admin = async (req, res, next) => {
  const jwt = req.get('Authorization')
  if (typeof jwt === 'undefined' || jwt === null) {
    throwUnauthorized(res)
  }

  try {
    await verifyJwt(jwt)
  } catch (e) {
    throwUnauthorized(res)
  }

  next()
}

module.exports = {
  admin,
}
