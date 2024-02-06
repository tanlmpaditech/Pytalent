import Result from '@models/entities/result.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from '../base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import Memory from '@models/entities/game/memory.entity'
import { MemoryRepositoryInterface } from '@repositories/interfaces/game/memory.repository.interface'

@Service({ global: true })
class MemoryRepository extends BaseRepository<Memory> implements MemoryRepositoryInterface<Memory> {
  constructor(@ModelContainer(Memory.tableName) Memory: ModelCtor<Memory>) {
    super(Memory)
  }

}

export default MemoryRepository
