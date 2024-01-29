// const wrapValuesWithDateTime = require('../utils/wrapValuesWithDateTime.ts')

const assessments = [
  {
    id: 1,
    start: '2024-01-29',
    end: '2024-02-16',
    type: '1'
  },

  {
    id: 2,
    start: '2024-01-29',
    end: '2024-02-18',
    type: '2'
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    return [await queryInterface.bulkInsert('assessments', assessments)]
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return [
      await queryInterface.bulkDelete('assessments', {
        id: assessments.map((assessment) => assessment.id),
      }),
    ]
  }
};
