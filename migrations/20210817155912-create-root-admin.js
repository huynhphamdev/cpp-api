const Auth = require('../services/auth')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Admins', [{
      username: 'admin',
      password: Auth.hash('123'),
    }])
  },

  down: async (queryInterface, Sequelize) => {
    const { Op } = Sequelize

    await queryInterface.bulkDelete('Admins', {
      username: {
        [Op.in]: ['admin'],
      },
    })
  },
}
