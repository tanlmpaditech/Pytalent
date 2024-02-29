import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import GameRepository from '@repositories/game.repository'
import { GameDto } from 'dtos/game.dto'
import { AdminMiddleware } from '@middlewares/admin.middleware'

@JsonController()
@Service()
export class GameController extends BaseController {
  constructor(protected gameRepository: GameRepository) {
    super()
  }

  // @Authorized()
  // @UseBefore(AdminMiddleware)
  @Post('/add-game')
  async addGame(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data: GameDto = req.body;
      const gameTypeExisted = await this.gameRepository.findByCondition({
        where: {type: data.type}
      });
      if(gameTypeExisted) {
        return this.setData('').setMessage('Existed').responseErrors(res)
      }
      await this.gameRepository.create(data)
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setData('').setMessage('Error').responseErrors(res)
    }
  }
  
}