import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import Candidate_assessmentRepository from '@repositories/candidate_assessment.repository'
import { HrAuthMiddleware } from '@middlewares/hr_auth.middleware'
import AssessmentRepository from '@repositories/assessment.repository'

@JsonController()
@Service()
export class Candidate_assessmentController extends BaseController {
  constructor(protected Candidate_assessmentRepository: Candidate_assessmentRepository, protected AssessmentRepository: AssessmentRepository) {
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
      const existed = await this.Candidate_assessmentRepository.findByCondition({
        where: {assessment_id: assessment_id, candidate_id: candidate_id}
      });
      if(existed) {
        return this.setData('').setMessage('Existed').responseErrors(res)
      }
      await this.Candidate_assessmentRepository.create(data)
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setData('').setMessage('Error').responseErrors(res)
    }
  }

  @Authorized()
  @UseBefore(HrAuthMiddleware)
  @Post('/delete-candidate-from-assessment/:assessment_id')
  async deleteCandidateFromAssessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const assessment_id = req.params.assessment_id;
      const candidate_id = req.body.candidate_id;
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim();
      const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
      const hr_id = payload.id;
      const assessment = await this.AssessmentRepository.findById(+assessment_id);

      if(assessment.hr_id !== hr_id) {
        return this.setData('').setMessage('You do not have permission').responseErrors(res); 
      };

      const data = await this.Candidate_assessmentRepository.findByCondition({
        where: {assessment_id: assessment_id, candidate_id: candidate_id}
      })

      if(!data) {
        return this.setData('').setMessage('Error').responseErrors(res)
      }
      
      await this.Candidate_assessmentRepository.deleteById(data.id)
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setData('').setMessage('Error').responseErrors(res)
    }
  }
}