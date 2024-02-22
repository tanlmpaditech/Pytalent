
import { BelongsTo, BelongsToMany, Column, CreatedAt, ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import Result from './result.entity';
import Assessment from './assessment.entity';
import Game from './game.entity';

@Table({
  tableName: 'assessment_games',
})
export default class Assessment_game extends Model<Assessment_game> {
  @PrimaryKey
  @Column
  id!: number;

  @ForeignKey(() => Assessment)
  @Column
  assessment_id!: Number;

  @ForeignKey(() => Result)
  @ForeignKey(() => Game)
  @Column
  game_id!: Number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @HasMany(() => Result)
  results: Result[];

  @BelongsTo(() => Assessment)
  assessment: Assessment

  @BelongsTo(() => Game)
  game: Game;
}
