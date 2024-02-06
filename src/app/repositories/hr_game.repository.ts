
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import Hr_game from '@models/entities/hr_game.entity'
import { Hr_gameRepositoryInterface } from './interfaces/hr_game.repository.interface'

@Service({ global: true })
class Hr_gameRepository extends BaseRepository<Hr_game> implements Hr_gameRepositoryInterface<Hr_game> {
  constructor(@ModelContainer(Hr_game.tableName) Hr_game: ModelCtor<Hr_game>) {
    super(Hr_game)
  }

}

export default Hr_gameRepository
