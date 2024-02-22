
import { BelongsTo, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import Assessment_game from './assessment_game.entity';
import User from './user.entity';

@Table({
  tableName: 'results',
})
export default class Result extends Model<Result> {
  @PrimaryKey
  @Column
  id!: number;

  @ForeignKey(() => User)
  @Column
  candidate_id!: Number;

  @Column
  score!: Number;

  @ForeignKey(() => Assessment_game)
  @Column
  assessment_game_id!: Number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @BelongsTo(() => Assessment_game)
  assessment_game: Assessment_game;

  @BelongsTo(() => User)
  user: User;
}
