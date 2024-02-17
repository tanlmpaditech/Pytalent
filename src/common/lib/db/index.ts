import { ModelCtor } from 'sequelize-typescript'

import DB from '@models/index'
import User from '@models/entities/user.entity'
import Assessment from '@models/entities/assessment.entity'
import Result from '@models/entities/result.entity'
import Candidate_assessment from '@models/entities/candidate_assessment.entity'
import Game from '@models/entities/game.entity'
import Hr_game from '@models/entities/hr_game.entity'
import Role from '@models/entities/role.entity'
import Logical from '@models/entities/logical.entity'
import Memory from '@models/entities/memory.entity'
import Assessment_game from '@models/entities/assessment_game.entity'

export function getModelFromTableName(tableName: string): ModelCtor | undefined {
  let item = undefined
  switch (tableName) {
    case User.tableName:
      item = DB.sequelize.model(User)
      break
    case Assessment.tableName:
      item = DB.sequelize.model(Assessment)
      break
    case Candidate_assessment.tableName:
      item = DB.sequelize.model(Candidate_assessment)
      break
    case Game.tableName:
      item = DB.sequelize.model(Game)
      break
    case Hr_game.tableName:
      item = DB.sequelize.model(Hr_game)
      break
    case Result.tableName:
      item = DB.sequelize.model(Result)
      break
    case Role.tableName:
      item = DB.sequelize.model(Role)
      break
    case Assessment_game.tableName:
      item = DB.sequelize.model(Assessment_game)
      break
    case Logical.tableName:
      item = DB.sequelize.model(Logical)
      break
    case Memory.tableName:
      item = DB.sequelize.model(Memory)
      break
    default:
      item = undefined
      break
  }
  return item
}
