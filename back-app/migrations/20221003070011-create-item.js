'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Items');
  }
};