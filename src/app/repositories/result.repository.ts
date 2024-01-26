import Result from '@models/entities/user.entity'
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

  async postResult(email: string, score: string): Promise<Result> {
    return this.create({ email, score })
  }

  async findByEmail(email: string): Promise<Result> {
    return this.findByCondition({
      where: { email: email },
    })
  }
  
}

export default ResultRepository
