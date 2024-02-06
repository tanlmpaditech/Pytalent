
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import Role from '@models/entities/role.entity'
import { RoleRepositoryInterface } from './interfaces/role.repository.interface'

@Service({ global: true })
class RoleRepository extends BaseRepository<Role> implements RoleRepositoryInterface<Role> {
  constructor(@ModelContainer(Role.tableName) Role: ModelCtor<Role>) {
    super(Role)
  }

}

export default RoleRepository
