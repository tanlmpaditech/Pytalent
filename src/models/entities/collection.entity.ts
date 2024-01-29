import User from './user.entity';
import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'collections',
})
export default class Collection extends Model<Collection> {
  @PrimaryKey
  @Column
  id!: number;

  @Column
  name!: string;

  @ForeignKey(() => User)
  @Column
  owner_id!: number;

  @BelongsTo(() => User, 'owner_id')
  owner!: User;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
