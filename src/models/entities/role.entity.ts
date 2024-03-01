
import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'roles',
})
export default class Role extends Model<Role> {
  @PrimaryKey
  @Column
  id!: number;

  @Column
  role_id!: number;

  @Column
  role_type!: string;

  @Column
  url: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
