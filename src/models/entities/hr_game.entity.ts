
import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'hr_games',
})
export default class Hr_game extends Model<Hr_game> {
  @PrimaryKey
  @Column
  id!: number;

  @Column
  hr_id!: Number;

  @Column
  game_id!: Number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
