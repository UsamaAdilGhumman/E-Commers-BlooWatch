'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Order,Product}) {
      // define association here
      this.belongsTo(Order,{foreignKey:'orderId',as:'orders'})
      this.belongsTo(Product,{foreignKey:'productId',as:'products'})
    }
  }
  Item.init({
    orderId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    productId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    rating: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'Items'
  });
  return Item;
};