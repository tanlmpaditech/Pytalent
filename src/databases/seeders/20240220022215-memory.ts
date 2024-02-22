'use strict';
const wrapValuesWithDateTimeMemory = require('../utils/wrapValuesWithDateTime.ts')

const memory = [
    {
        level: 1,
        question: 1,
        time: 3,
        score: 1
    },
    {
        level: 2,
        question: 12,
        time: 3,
        score: 2
    },
    {
        level: 3,
        question: 123,
        time: 3,
        score: 3
    },
    {
        level: 4,
        question: 1234,
        time: 4,
        score: 4
    },
    {
        level: 5,
        question: 12345,
        time: 5,
        score: 5
    },
    {
        level: 6,
        question: 123456,
        time: 6,
        score: 6
    },
    {
        level: 7,
        question: 1234567,
        time: 7,
        score: 7
    },
    {
        level: 8,
        question: 12345678,
        time: 8,
        score: 8
    },
]
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return await queryInterface.bulkInsert('memories', wrapValuesWithDateTimeMemory(memory));
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('memories', null, {});
  }
};
