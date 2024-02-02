import { ModelCtor } from 'sequelize-typescript'

import DB from '@models/index'
import User from '@models/entities/user.entity'
import Assessment from '@models/entities/assessment.entity'
import Result from '@models/entities/result.entity'
import Collection from '@models/entities/collection.entity'
import Test from '@models/entities/test/logical.entity'

export function getModelFromTableName(tableName: string): ModelCtor | undefined {
  let item = undefined
  switch (tableName) {
    case User.tableName:
      item = DB.sequelize.model(User)
      break
    case Assessment.tableName:
      item = DB.sequelize.model(Assessment)
      break
    case Result.tableName:
      item = DB.sequelize.model(Result)
      break
    case Collection.tableName:
      item = DB.sequelize.model(Collection)
      break
    case Test.tableName:
      item = DB.sequelize.model(Test)
      break
    default:
      item = undefined
      break
  }
  return item
}
