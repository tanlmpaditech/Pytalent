import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface GameRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
}
