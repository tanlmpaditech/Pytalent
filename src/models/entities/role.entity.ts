
import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'roles',
})
export default class Role extends Model<Role> {
  @PrimaryKey
  @Column
  id!: number;

  @Column
  url!: String;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
