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

  // async findByAddress(address: string): Promise<User> {
  //   return this.findByCondition({
  //     where: { address: address },
  //     raw: true,
  //   })
  // }

  async createUser(email: string, password: string): Promise<User> {
    return this.create({ email, password })
  }
  
  // async findOrCreateByAddress(address: string): Promise<[User, boolean]> {
  //   return this.findOrCreateByCondition({
  //     where: { address: address },
  //     raw: true,
  //   })
  // }
}

export default UserRepository
