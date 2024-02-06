'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return await queryInterface.bulkInsert('results', [{
      email: 'example@example.com',
      score: '9',
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('results', null, {});
  }
};
