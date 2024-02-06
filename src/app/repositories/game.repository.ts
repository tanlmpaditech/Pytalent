
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import Game from '@models/entities/game.entity'
import { GameRepositoryInterface } from './interfaces/game.repository.interface'


@Service({ global: true })
class GameRepository extends BaseRepository<Game> implements GameRepositoryInterface<Game> {
  constructor(@ModelContainer(Game.tableName) Game: ModelCtor<Game>) {
    super(Game)
  }

}

export default GameRepository
