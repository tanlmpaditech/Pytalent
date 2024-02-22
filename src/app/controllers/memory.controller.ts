import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import MemoryRepository from '@repositories/memory.repository'
import { AuthMiddleware } from '@middlewares/auth.middleware'

@JsonController()
@Service()
export class MemoryController extends BaseController {
  constructor(protected memoryRepository: MemoryRepository) {
    super()
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Get('/assessment/:id/memory-game')
  async getLogicalQuestion(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data = await this.memoryRepository.findAllByCondition({
        attributes: ['question', 'time', 'score']
      });
      return this.setData(data).setMessage('Success').responseSuccess(res)
    } catch (error) {
      console.log(error);
      return this.setMessage('Error').responseErrors(res)
    }
  }
}