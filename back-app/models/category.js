'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Product}) {
      // define association here
      // this.hasOne(Category,{foreignKey: 'category', as: 'category'})
      // this.belongsTo(Product,{foreignKey: 'categoryId', as: 'products'})
      this.hasOne(Product,{foreignKey: 'categoryId', as: 'products'})
    }
  }
  Category.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'categories'
  });
  return Category;
};