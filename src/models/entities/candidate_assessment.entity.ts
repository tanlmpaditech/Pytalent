
import { BelongsTo, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import User from './user.entity';
import Assessment from './assessment.entity';

@Table({
  tableName: 'candidate_assessments',
})
export default class Candidate_assessment extends Model<Candidate_assessment> {
  @PrimaryKey
  @Column
  id!: number;

  @ForeignKey(() => User)
  @Column
  candidate_id!: Number;

  @ForeignKey(() => Assessment)
  @Column
  assessment_id!: Number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Assessment)
  assessment!: Assessment;
}
