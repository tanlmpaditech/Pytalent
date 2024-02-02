import Result from '@models/entities/result.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import { TestRepositoryInterface } from './interfaces/test.repository.interface'
import Test from '@models/entities/test.entity'

@Service({ global: true })
class TestRepository extends BaseRepository<Test> implements TestRepositoryInterface<Test> {
  constructor(@ModelContainer(Test.tableName) Test: ModelCtor<Test>) {
    super(Test)
  }

}

export default TestRepository
