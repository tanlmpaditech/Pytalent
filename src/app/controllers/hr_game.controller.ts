import { Authorized, Delete, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import Hr_gameRepository from '@repositories/hr_game.repository'
import { Hr_gameDto } from 'dtos/hr_game.dto'
import GameRepository from '@repositories/game.repository'
import { AdminMiddleware } from '@middlewares/admin.middleware'
import UserRepository from '@repositories/user.repository'

@JsonController()
@Service()
export class Hr_gameController extends BaseController {
  constructor(
    protected hr_gameRepository: Hr_gameRepository, 
    protected GameRepository: GameRepository,
    protected UserRepository: UserRepository
  ) {
    super()
  }

  @Authorized()
  @UseBefore(AdminMiddleware)
  @Post('/add-hr-to-game')
  async addHrToGame(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data: Hr_gameDto = req.body;
      const user = await this.UserRepository.findByCondition({
        where: {user_id: data.hr_id}
      })
      if(user.role_id !== 1) {
        return this.setData('').setMessage('HR ID is not existed').responseErrors(res)
      }
      const game = await this.GameRepository.findById(+data.game_id);
      if(!game) {
        return this.setData('').setMessage('Game ID is not existed').responseErrors(res)
      }
      const existed = await this.hr_gameRepository.findByCondition({
        where: {hr_id: data.hr_id, game_id: data.game_id}
      })
      if(existed) {
        return this.setData('').setMessage('Existed').responseErrors(res)
      }
      await this.hr_gameRepository.create(data)
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      console.log(error);
      return this.setData('').setMessage('Error').responseErrors(res)
    }
  }

  @Authorized()
  @UseBefore(AdminMiddleware)
  @Post('/delete-hr-from-game')
  async deleteHrFromGame(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const payload = req.body;
      const data = await this.hr_gameRepository.findByCondition({
        where: {hr_id: payload.hr_id, game_id: payload.game_id}
      })
      if(!data) {
        return this.setData('').setMessage('Error').responseErrors(res)
      }
      await this.hr_gameRepository.deleteById(data.id)
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setData('').setMessage('Error').responseErrors(res)
    }
  }
}