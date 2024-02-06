
import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'memories',
})
export default class Memory extends Model<Memory> {
  @PrimaryKey
  @Column
  id!: number;

  @Column
  question!: String;

  @Column
  answer!: String;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
