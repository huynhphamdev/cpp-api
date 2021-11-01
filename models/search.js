module.exports = (sequelize, DataTypes) => {
  const Search = sequelize.define('Search', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    code: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, { tableName: 'Searches' })

  Search.prototype.display = function() {
    return this.get({ plain: true })
  }

  return Search
}
