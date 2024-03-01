import { Authorized, Get, JsonController, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import MemoryRepository from '@repositories/memory.repository'
import { AuthMiddleware } from '@middlewares/auth.middleware'
import AssessmentRepository from '@repositories/assessment.repository'
import Candidate_assessmentRepository from '@repositories/candidate_assessment.repository'
import Assessment_gameRepository from '@repositories/assessment_game.repository'
import { CandidateAuthMiddleware } from '@middlewares/candidate_auth.middleware'

@JsonController()
@Service()
export class MemoryController extends BaseController {
  constructor(
    protected memoryRepository: MemoryRepository,
    protected assessmentRepository: AssessmentRepository, 
    protected candidate_assessmentRepository: Candidate_assessmentRepository,
    protected assessment_gameRepository: Assessment_gameRepository
  ) {
    super()
  }

  @Authorized()
  @UseBefore(CandidateAuthMiddleware)
  @Get('/assessment/:id/memory-game')
  async getLogicalQuestion(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const assessment = await this.assessmentRepository.findById(+id);
      if(!assessment) {
        return this.setData('').setMessage('Assessment is not existed').responseErrors(res)
      }
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim();
      const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
      const candidate_id = payload.id;
      const candidateCanAccess = await this.candidate_assessmentRepository.findAllByCondition({
        where: {assessment_id: id},
        attributes: ['candidate_id']
      })
      const candidateIdCanAccess = candidateCanAccess.map((data) => data.candidate_id)
      if(!candidateIdCanAccess.includes(+candidate_id)) {
        return this.setData('').setMessage('You are not allowed to access').responseErrors(res);
      }
      const data = await this.memoryRepository.findAllByCondition({
        attributes: ['question', 'time', 'score']
      });
      return this.setData(data).setMessage('Success').responseSuccess(res)
    } catch (error) {
      console.log(error);
      return this.setData('').setMessage('Error').responseErrors(res)
    }
  }
}