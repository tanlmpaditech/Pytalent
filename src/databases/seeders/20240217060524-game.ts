'use strict';
const wrapValuesWithDateTimeGame = require('../utils/wrapValuesWithDateTime.ts')

const game = [
    {
        type: 'logical',
        time: 90
    }, 
    {
        type: 'memory',
        time: 600
    }]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return await queryInterface.bulkInsert('games', wrapValuesWithDateTimeGame(game));
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('games', null, {});
  }
};
