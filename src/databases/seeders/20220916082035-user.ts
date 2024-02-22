const wrapValuesWithDateTimeUser = require('../utils/wrapValuesWithDateTime.ts')

const users = [
  {
    user_id: 1,
    name: 'admin',
    email: 'admin@example.com',
    password: '$2b$10$uAAaPu7svUAz8XLjEApZoOTL3/zYUTAj1VSz82HRozhWpJdbT7y1S',
    role_id: 0,
  },

  {
    user_id: 2,
    name: 'hr 1',
    email: 'hr1@example.com',
    password: '$2b$10$SuNanIIQKwWnjPdpRAgsqOq9QusGks6kjMbPuiPc1dMjqlFvjU1Bq',
    role_id: 1,
  },

  {
    user_id: 3,
    name: 'hr 2',
    email: 'hr2@example.com',
    password: '$2b$10$tyeJwA/5AXJQogXIrDwDweO4.8s2Es5ICR.gFp6bNFoDsfJ3bbe9u',
    role_id: 1,
  },

  {
    user_id: 4,
    name: 'candidate 1',
    email: 'candidate1@example.com',
    password: '$2a$10$sjBJjlj9omdvDhb/kVi0PesQQHlVFRHqb6.Do/ozgNIoDevNZD0wG',
    role_id: 2,
  },

  {
    user_id: 5,
    name: 'candidate 2',
    email: 'candidate2@example.com',
    password: '$2a$10$/ZxY9A.E8YlVtxuV6iVRFuLytb340UT2aLJO41SUmxOFxzYMW3s/G',
    role_id: 2,
  }
]

module.exports = {
  async up(queryInterface) {
    return [await queryInterface.bulkInsert('users', wrapValuesWithDateTimeUser(users))]
    // return [await queryInterface.bulkInsert('users', users)]

  },

  async down(queryInterface) {
    return [
      await queryInterface.bulkDelete('users', null, {}),
    ]
  },
}

/*
import { hash } from 'bcrypt';
Promise.all(
    [
        'password01',
        'password02',
        'password03',
    ].map( it =>  hash(it, 10))
).then(it => console.log('>>>>>>>>>>>>>>>>>', it))
*/
