import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface RoleRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
}
