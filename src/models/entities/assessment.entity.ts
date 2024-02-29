import { Column, CreatedAt, ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import User from './user.entity';
import Assessment_game from './assessment_game.entity';
import Candidate_assessment from './candidate_assessment.entity';

@Table({
  tableName: 'assessments',
})
export default class Assessment extends Model<Assessment> {
  @PrimaryKey
  @Column
  id!: number;

  @ForeignKey(() => Assessment_game)
  @ForeignKey(() => Candidate_assessment)
  @Column
  assessment_id!: Number;

  @Column
  start!: Date;

  @Column
  end!: Date;

  @Column
  status!: String;

  @ForeignKey(() => User)
  @Column
  hr_id!: Number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @HasMany(() => Assessment_game)
  assessment_game: Assessment_game[]

  @HasMany(() => Candidate_assessment)
  candidate_assessment: Candidate_assessment[]
}
