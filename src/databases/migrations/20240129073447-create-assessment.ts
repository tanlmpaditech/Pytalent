'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('assessments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start: {
        type: Sequelize.DATE,
        field: 'start',
        allowNull: false,
      },
      end: {
        type: Sequelize.DATE,
        field: 'end',
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        field: 'type',
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
    await queryInterface.dropTable('assessments');
  }
};