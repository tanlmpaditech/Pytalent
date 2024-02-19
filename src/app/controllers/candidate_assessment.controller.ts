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
      const assessment_id = req.params;
      const candidate_id = req.body;
      const data = {assessment_id, candidate_id}
      await this.candidate_assessmentRepository.create(data)
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

}