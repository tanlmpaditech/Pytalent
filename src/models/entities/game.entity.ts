
import { Column, CreatedAt, ForeignKey, HasMany, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import Assessment_game from './assessment_game.entity';

@Table({
  tableName: 'games',
})
export default class Game extends Model<Game> {
  @PrimaryKey
  @Column
  id!: number;

  @ForeignKey(() => Assessment_game)
  @Column
  game_id!: Number;

  @Column
  type!: String;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @HasMany(() => Assessment_game)
  assessment_game: Assessment_game[];
}
