import { Model } from 'sequelize'
import { BaseRepositoryInterface } from '../base.repository.interface'

export interface LogicalRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
}
