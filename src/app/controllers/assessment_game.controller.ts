import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import Assessment_gameRepository from '@repositories/assessment_game.repository'

@JsonController()
@Service()
export class Assessment_gameController extends BaseController {
  constructor(protected Assessment_gameRepository: Assessment_gameRepository) {
    super()
  }

  @Post('/add-game-to-assessment')
  async addGameToAssessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data: Assessment_gameRepository = req.body;
      await this.Assessment_gameRepository.create(data)
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }
}