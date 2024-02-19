import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'assessments',
})
export default class Assessment extends Model<Assessment> {
  @PrimaryKey
  @Column
  id!: number;

  @Column
  start!: Date;

  @Column
  end!: Date;

  @Column
  status!: String;

  @Column
  hr_id!: Number;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  static associate(models) {
    this.hasMany(models.Assessment_game , {
      foreignKey: 'id'
    })
    this.hasMany(models.Candidate_assessment)
  }
}
