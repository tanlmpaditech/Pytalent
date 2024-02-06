
import { Service } from 'typedi'
import { ModelCtor } from 'sequelize-typescript'
import { BaseRepository } from './base.repository'
import { ModelContainer } from '@decorators/model.decorator'
import Candidate_assessment from '@models/entities/candidate_assessment.entity'
import { Candidate_assessmentRepositoryInterface } from './interfaces/candidate_assessment.repository.interface'


@Service({ global: true })
class Candidate_assessmentRepository extends BaseRepository<Candidate_assessment> implements Candidate_assessmentRepositoryInterface<Candidate_assessment> {
  constructor(@ModelContainer(Candidate_assessment.tableName) Candidate_assessment: ModelCtor<Candidate_assessment>) {
    super(Candidate_assessment)
  }

}

export default Candidate_assessmentRepository
