import { Model } from 'sequelize'
import { BaseRepositoryInterface } from '../base.repository.interface'

export interface MemoryRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
}
