const wrapValuesWithDateTimeAssessment = require('../utils/wrapValuesWithDateTime.ts')

const assessments = [
   {
    assessment_id: 1,
    start: '2024-01-19',
    end: '2024-02-29',
    status: 'active',
    hr_id: 2
  },

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
