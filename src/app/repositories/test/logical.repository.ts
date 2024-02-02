import Result from '@models/entities/result.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from '../base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import Test from '@models/entities/test/logical.entity'
import { LogicalRepositoryInterface } from '@repositories/interfaces/test/logical.repository.interface'

@Service({ global: true })
class LogicalRepository extends BaseRepository<Test> implements LogicalRepositoryInterface<Test> {
  constructor(@ModelContainer(Test.tableName) Test: ModelCtor<Test>) {
    super(Test)
  }

}

export default LogicalRepository
