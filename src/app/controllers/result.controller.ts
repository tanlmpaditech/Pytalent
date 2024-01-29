import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import ResultRepository from '@repositories/result.repository'

@JsonController()
@Service()
export class ResultController extends BaseController {
  constructor(protected resultRepository: ResultRepository) {
    super()
  }

  @Authorized()
  @Post('/post-result')
  async postCandidateResult(@Req() req: any, @Res() res: Response, next: NextFunction) {
    try {
      const email = req.body.email;
      const score = req.body.score;
      // const data = plainToClass(UserDto, req.body)
      const data = { email: email, score: score }
      console.log(data);
      await this.resultRepository.create(data)
      return this.setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

  // @Authorized()
  @Get('/results')
  async getCandidateResult(@Req() req: any, @Res() res: Response, next: NextFunction) {
    try {
      const findAllCandidateResults = await this.resultRepository.getAll()
      console.log(findAllCandidateResults);
      return this.setData(findAllCandidateResults).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }
}

export default ResultController
