
import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'assessment_games',
})
export default class Assessment_game extends Model<Assessment_game> {
  @PrimaryKey
  @Column
  id!: number;

  @Column
  assessment_id!: Number;

  @Column
  game_id!: Number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
