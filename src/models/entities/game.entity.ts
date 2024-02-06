
import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'games',
})
export default class Game extends Model<Game> {
  @PrimaryKey
  @Column
  id!: number;

  @Column
  type!: String;

  @Column
  time!: Number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
