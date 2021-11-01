const _ = require('lodash')

const Auth = require('../services/auth')

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: { args: true, msg: '20001' },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'Admins',
    setterMethods: {
      password(value) {
        this.setDataValue('password', Auth.hash(value))
      },
    },
  })

  Admin.prototype.display = function() {
    return _.omit(this.get({ plain: true }), 'password')
  }

  return Admin
}
