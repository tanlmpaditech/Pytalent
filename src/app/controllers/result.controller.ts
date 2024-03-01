import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import ResultRepository from '@repositories/result.repository'
import { ResultDto } from 'dtos/result.dto'
import { AdminMiddleware } from '@middlewares/admin.middleware'
import { AuthMiddleware } from '@middlewares/auth.middleware'
import DB from '@models/index'

@JsonController()
@Service()
export class ResultController extends BaseController {
  constructor(protected resultRepository: ResultRepository) {
    super()
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Post('/post-result')
  async postCandidateResult(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data: ResultDto = req.body;
      const existedResult = await this.resultRepository.findByCondition({
        where: {candidate_id: data.candidate_id, assessment_game_id: data.assessment_game_id}
      });
      if(existedResult) {
        return this.setData('').setMessage('Result existed').responseErrors(res)
      }
      await this.resultRepository.create(data);
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setData('').setMessage('Error').responseErrors(res)
    }
  }

  @Authorized()
  @UseBefore(AdminMiddleware)
  @Get('/all-results')
  async getCandidateResult(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const allCandidateResults = await this.resultRepository.findAllByCondition({
        include: [{
          model: DB.sequelize.models.Assessment_game,
          attributes: ['assessment_id'],
          include: [{
            model: DB.sequelize.models.Game,
            attributes: ['type'],
          }]
        }],
      })
      return this.setData(allCandidateResults).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setData('').setMessage('Error').responseErrors(res)
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Get('/result')
  async getCandidateResultById(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      // const id = req.body.id;
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim();
      const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
      const candidate_id = payload.id;
      const result = await this.resultRepository.findAllByCondition({
        where: {candidate_id: candidate_id},
        include: [{
          model: DB.sequelize.models.Assessment_game,
          attributes: ['assessment_id'],
          include: [{
            model: DB.sequelize.models.Game,
            attributes: ['type'],
          }]
        }],
      })
      if(!result) {
        return this.setData('').setMessage('Result is not existed').responseErrors(res)
      }
      return this.setData(result).setMessage('Get result successfully').responseSuccess(res);
    } catch (error) {
      console.log(error);
      return this.setData('').setMessage('Error').responseErrors(res)
    }
  }
}

export default ResultController
