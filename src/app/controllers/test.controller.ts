import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import TestRepository from '@repositories/test.repository'

@JsonController()
@Service()
export class TestController extends BaseController {
  constructor(protected testRepository: TestRepository) {
    super()
  }

  @Get('/test/:assessment_id')
  async getTest(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const getQuestion = await this.testRepository.getAll() //get 20 questions
      return this.setData(getQuestion).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

}

export default TestController
