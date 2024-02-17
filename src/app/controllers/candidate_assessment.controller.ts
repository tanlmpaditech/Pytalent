import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import Candidate_assessmentRepository from '@repositories/candidate_assessment.repository'

@JsonController()
@Service()
export class Candidate_assessmentController extends BaseController {
  constructor(protected candidate_assessmentRepository: Candidate_assessmentRepository) {
    super()
  }

  @Post('/add-candidate-to-assessment')
  async addCandidateToAssessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data: Candidate_assessmentRepository = req.body;
      console.log(data);
      await this.candidate_assessmentRepository.create(data)
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

}