import User from '@models/entities/user.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { UserRepositoryInterface } from './interfaces/user.repository.interface'
import { ModelContainer } from '@decorators/model.decorator'

@Service({ global: true })
class UserRepository extends BaseRepository<User> implements UserRepositoryInterface<User> {
  constructor(@ModelContainer(User.tableName) User: ModelCtor<User>) {
    super(User)
  }

  async findByEmail(email: string): Promise<User> {
    return this.findByCondition({
      where: { email: email },
    })
  }

  async createUser(email: string, password: string, type_user: number): Promise<User> {
    return this.create({ email, password, type_user })
  }

}

export default UserRepository
