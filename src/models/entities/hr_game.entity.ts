
import { BelongsTo, Column, CreatedAt, ForeignKey, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import User from './user.entity';
import Game from './game.entity';

@Table({
  tableName: 'hr_games',
})
export default class Hr_game extends Model<Hr_game> {
  @PrimaryKey
  @Column
  id!: number;

  @ForeignKey(() => User)
  @Column
  hr_id!: Number;

  @ForeignKey(() => Game)
  @Column
  game_id!: Number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Game)
  game: Game;

}
