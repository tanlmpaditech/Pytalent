
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

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  static associate(models) {
    this.hasMany(models.Assessment_game, {
      foreignKey: 'game_id'
    }),
    this.hasMany(models.Hr_game), {
      foreignKey: 'id',
    }
  }

}
