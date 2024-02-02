
import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'tests',
})
export default class Test extends Model<Test> {
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
