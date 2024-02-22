import Result from '@models/entities/result.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import { ResultRepositoryInterface } from './interfaces/result.repository.interface'

@Service({ global: true })
class ResultRepository extends BaseRepository<Result> implements ResultRepositoryInterface<Result> {
  constructor(@ModelContainer(Result.tableName) Result: ModelCtor<Result>) {
    super(Result)
  }

}

export default ResultRepository
