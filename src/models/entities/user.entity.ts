import { Column, CreatedAt, ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript'
import Role from './role.entity'
import Result from './result.entity'
import Candidate_assessment from './candidate_assessment.entity'
import Hr_game from './hr_game.entity'

@Table({
  tableName: 'users',
})
export default class User extends Model<User> {
  @PrimaryKey
  @Column
  id!: number

  @ForeignKey(() => Candidate_assessment)
  @ForeignKey(() => Result)
  @ForeignKey(() => Hr_game)
  user_id!: Number

  @Column
  name!: string

  @Column
  email!: string

  @Column
  password!: string

  @ForeignKey(() => Role)
  @Column
  role_id!: number

  @CreatedAt
  @Column
  createdAt!: Date

  @UpdatedAt
  @Column
  updatedAt!: Date

  @HasMany(() => Result)
  result: Result[]

}
