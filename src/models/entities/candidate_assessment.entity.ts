
import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'candidate_assessments',
})
export default class Candidate_assessment extends Model<Candidate_assessment> {
  @PrimaryKey
  @Column
  id!: number;

  @Column
  candidate_id!: Number;

  @Column
  assessment_id!: Number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
