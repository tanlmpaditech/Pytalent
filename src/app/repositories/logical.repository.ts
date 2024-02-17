
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import Logical from '@models/entities/logical.entity'
import { LogicalRepositoryInterface } from '@repositories/interfaces/logical.repository.interface'
import { Sequelize } from 'sequelize'

@Service({ global: true })
class LogicalRepository extends BaseRepository<Logical> implements LogicalRepositoryInterface<Logical> {
  constructor(@ModelContainer(Logical.tableName) Logical: ModelCtor<Logical>) {
    super(Logical)
  }

  async getLimit(attribute: any, limit: number) {
    return this.model.findAll({
      attributes: attribute,
      limit: limit,
      order: Sequelize.literal('random()')
    })
  }

}

export default LogicalRepository
