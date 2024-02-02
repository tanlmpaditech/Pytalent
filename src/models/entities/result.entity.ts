
import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'results',
})
export default class Result extends Model<Result> {
  @PrimaryKey
  @Column
  id!: number;

  @Column
  email!: String;

  @Column
  score!: String;

  @Column
  assessment_id!: String;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
