const wrapValuesWithDateTimeAssessment = require('../utils/wrapValuesWithDateTime.ts')

const assessments = [
   {
    start: '2024-01-29',
    end: '2024-02-25',
    status: 'active',
    hr_id: '1'
  },

  {
    start: '2024-01-29',
    end: '2024-02-18',
    status: 'closed',
    hr_id: '2'
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
