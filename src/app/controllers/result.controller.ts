import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import ResultRepository from '@repositories/result.repository'
import { ResultDto } from 'dtos/result.dto'
import { HrAuthMiddleware } from '@middlewares/hr_auth.middleware'
import { AdminMiddleware } from '@middlewares/admin.middleware'
import DB from '@models/index'
import { AuthMiddleware } from '@middlewares/auth.middleware'

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
      await this.resultRepository.create(data);
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

  @Authorized()
  @UseBefore(AdminMiddleware)
  @Get('/all-results')
  async getCandidateResult(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const findAllCandidateResults = await this.resultRepository.getAll()
      // console.log(findAllCandidateResults);
      return this.setData(findAllCandidateResults).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

  @Get('/result')
  async getCandidateResultByEmail(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const id = req.body.id;
      // const findResultByEmail = await this.resultRepository.findByEmail(email);
      const result = await this.resultRepository.findAllByCondition({
        include: [{
          model: DB.sequelize.models.assessment_game,
          where: {assessment_game_id: id}
        }]
      })
      return this.setData(result).setMessage('Get result successfully').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }
}

export default ResultController
