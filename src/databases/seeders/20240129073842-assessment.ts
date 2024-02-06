const wrapValuesWithDateTimeAssessment = require('../utils/wrapValuesWithDateTime.ts')

const assessments = [
   {
    start: '2024-01-29',
    end: '2024-02-16',
    type: '1',
  },

  {
    start: '2024-01-29',
    end: '2024-02-18',
    type: '2',
  }
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('assessments', wrapValuesWithDateTimeAssessment(assessments))]

  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('users', null, {}),
    ]
  },
}
