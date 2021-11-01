const Auth = require('../services/auth')
const { response } = require('../services/response')
const {
  Admin,
  sequelize,
} = require('../models')

const login = async (req, res) => {
  const { username, password } = req.body

  await sequelize.transaction(async (transaction) => {
    const admin = await Admin.findOne({
      where: { username },
      transaction,
    })

    if (admin) {
      if (admin.retry > 2) {
        res.status(401)
        throw new Error('20006')
      }

      if (Auth.compareHash(password, admin.password)) {
        const { token, data } = Auth.generateJwt({
          id: admin.id,
          username: admin.username,
        }, '12h')
        res.json(response({ token }))
        return
      }
    }
    res.status(401)
    throw new Error('10001')
  })
}

module.exports = {
  login,
}
