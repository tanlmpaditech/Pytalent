'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        field: 'email',
        allowNull: false,
      },
      score: {
        type: Sequelize.STRING,
        field: 'score',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'createdAt',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updatedAt',
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('results');
  }
};