'use strict';
const wrapValuesWithDateTimeResult = require('../utils/wrapValuesWithDateTime.ts')

const result = [{
      candidate_id: 4,
      assessment_game_id: 1,
      score: 9,
      created_at: new Date(),
      updated_at: new Date(),
    }]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return await queryInterface.bulkInsert('results', wrapValuesWithDateTimeResult(result));
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
