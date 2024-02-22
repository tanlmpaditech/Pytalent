const wrapValuesWithDateTimeAssessment = require('../utils/wrapValuesWithDateTime.ts')

const assessments = [
   {
    assessment_id: 1,
    start: '2024-01-19T09:45:03.774Z',
    end: '2024-02-25T09:45:03.774Z',
    status: 'active',
    hr_id: '1'
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
