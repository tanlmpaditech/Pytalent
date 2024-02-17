
import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'logicals',
})
export default class Logical extends Model<Logical> {
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
