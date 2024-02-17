import Assessment from '@models/entities/assessment.entity'
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import { AssessmentRepositoryInterface } from './interfaces/assessment.repository.interface'

@Service({ global: true })
class AssessmentRepository extends BaseRepository<Assessment> implements AssessmentRepositoryInterface<Assessment> {
  constructor(@ModelContainer(Assessment.tableName) Assessment: ModelCtor<Assessment>) {
    super(Assessment)
  }

  async createAssessment(start: Date, end: Date, status: String): Promise<Assessment> {
    return this.create({ start, end, status })
  }
  
  // async deleteAssessment(id: number): Promise<number> {
  //   return this.deleteById(id)
  //   // return this.deleteAssessment(id)
  // }
  async update(object: Assessment): Promise<Assessment> {
    return this.update(object)
  }
}

export default AssessmentRepository
