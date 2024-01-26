import { ModelCtor } from 'sequelize-typescript'

import DB from '@models/index'
import User from '@models/entities/user.entity'

export function getModelFromTableName(tableName: string): ModelCtor | undefined {
  let item = undefined
  switch (tableName) {
    case User.tableName:
      item = DB.sequelize.model(User)
      break
    default:
      item = undefined
      break
  }
  return item
}
