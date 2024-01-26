import { Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'assessments',
})
export default class Assessment extends Model<Assessment> {
  @PrimaryKey
  @Column
  id!: number;

  @Column
  start!: string;

  @Column
  end!: string;

  @Column
  type!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}

export { Assessment };
