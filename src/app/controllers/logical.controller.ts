import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import LogicalRepository from '@repositories/logical.repository'
import AuthController from './auth.controller'
import { AuthMiddleware } from '@middlewares/auth.middleware'

@JsonController()
@Service()
export class LogicalController extends BaseController {
  constructor(protected logicalRepository: LogicalRepository) {
    super()
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Get('/assessment/:id/logical-game')
  async getLogicalQuestion(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const getQuestion = await this.logicalRepository.getLimit(['question', 'answer'], 20) //get 20 questions
      return this.setData(getQuestion).setMessage('Success').responseSuccess(res)
    } catch (error) {
      console.log(error);
      return this.setMessage('Error').responseErrors(res)
    }
  }

}
