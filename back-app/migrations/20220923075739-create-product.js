'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      stock_limit: {
        type: DataTypes.INTEGER
      },
      price: {
        type: DataTypes.INTEGER
      },
      rating: {
        type: DataTypes.INTEGER
      },
      isdraft: {
        type: DataTypes.STRING
      },
      categoryId: {
        type: DataTypes.INTEGER
      },
      pictures: {
        type: DataTypes.STRING(1000)
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      userId:{
        allowNull:false,
        type:DataTypes.INTEGER
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('products');
  }
};