'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      rating: {
        type: DataTypes.INTEGER
      },
      comment: {
        type: DataTypes.STRING
      },
      productId:{
        type: DataTypes.INTEGER,
        allowNull:false,
      },
      userId:{
        type: DataTypes.INTEGER,
        allowNull:false
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
    await queryInterface.dropTable('reviews');
  }
};