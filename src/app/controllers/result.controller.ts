import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import ResultRepository from '@repositories/result.repository'

@JsonController()
@Service()
export class ResultController extends BaseController {
  constructor(protected resultRepository: ResultRepository) {
    super()
  }

  // @Authorized()
  @Post('/post-result')
  async postCandidateResult(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      // const email = req.body.email;
      // const score = req.body.score;
      // const data = { email: email, score: score }
      // console.log(data);
      const data = req.body;
      console.log(data);
      await this.resultRepository.create(data)
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

  // @Authorized()
  // @UseBefore(AuthMiddleware)
  @Get('/all-results')
  async getCandidateResult(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const findAllCandidateResults = await this.resultRepository.getAll()
      console.log(findAllCandidateResults);
      return this.setData(findAllCandidateResults).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

  @Get('/result')
  async getCandidateResultByEmail(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const email = req.params.email;
      const findResultByEmail = await this.resultRepository.findByEmail(email);
      return this.setData(findResultByEmail).setMessage('Get result successfully').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }
}

export default ResultController
