import Result from '@models/entities/result.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from '../base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import Logical from '@models/entities/game/logical.entity'
import { LogicalRepositoryInterface } from '@repositories/interfaces/game/logical.repository.interface'

@Service({ global: true })
class LogicalRepository extends BaseRepository<Logical> implements LogicalRepositoryInterface<Logical> {
  constructor(@ModelContainer(Logical.tableName) Logical: ModelCtor<Logical>) {
    super(Logical)
  }

}

export default LogicalRepository
