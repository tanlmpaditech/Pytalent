import { Model } from 'sequelize'
import { BaseRepositoryInterface } from './base.repository.interface'

export interface AssessmentRepositoryInterface<M extends Model> extends BaseRepositoryInterface {
    createAssessment(start: Date, end: Date, type: string) : Promise<M>
    // deleteAssessment(id: number) : Promise<number>
}

