import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import Candidate_assessmentRepository from '@repositories/candidate_assessment.repository'
import { HrAuthMiddleware } from '@middlewares/hr_auth.middleware'

@JsonController()
@Service()
export class Candidate_assessmentController extends BaseController {
  constructor(protected candidate_assessmentRepository: Candidate_assessmentRepository) {
    super()
  }

  @Authorized()
  @UseBefore(HrAuthMiddleware)
  @Post('/add-candidate-to-assessment/:assessment_id')
  async addCandidateToAssessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const assessment_id = req.params.assessment_id;
      const candidate_id = req.body.candidate_id;
      const data = {assessment_id, candidate_id}
      const existed = await this.candidate_assessmentRepository.findByCondition({
        where: {assessment_id: assessment_id, candidate_id: candidate_id}
      });
      if(existed) {
        return this.setMessage('Existed').responseErrors(res)
      }
      await this.candidate_assessmentRepository.create(data)
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

  // @Post('/delete-candidate-from-assessment')
  // async deleteCandidateFromAssessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
  //   try {
  //     const id = 1
  //     await this.candidate_assessmentRepository.deleteById(1)
  //     return this.setData('').setMessage('Success').responseSuccess(res);
  //   } catch (error) {
  //     return this.setMessage('Error').responseErrors(res)
  //   }
  // }
}