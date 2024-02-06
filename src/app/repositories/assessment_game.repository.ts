
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import { Assessment_gameRepositoryInterface } from './interfaces/assessment_game.repository.interface'
import Assessment_game from '@models/entities/assessment_game.entity'

@Service({ global: true })
class Assessment_gameRepository extends BaseRepository<Assessment_game> implements Assessment_gameRepositoryInterface<Assessment_game> {
  constructor(@ModelContainer(Assessment_game.tableName) Assessment_game: ModelCtor<Assessment_game>) {
    super(Assessment_game)
  }

}

export default Assessment_gameRepository
