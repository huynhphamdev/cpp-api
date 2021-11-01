module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, { tableName: 'Categories' })

  Category.prototype.display = function() {
    return this.get({ plain: true })
  }

  Category.associate = (models) => {
    Category.hasMany(models.Lesson, { as: 'lessons', foreignKey: 'category_id' })
  }

  return Category
}
