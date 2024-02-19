import { Authorized, Delete, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import Hr_gameRepository from '@repositories/hr_game.repository'
import { Hr_gameDto } from 'dtos/hr_game.dto'
import GameRepository from '@repositories/game.repository'
import DB from '@models/index'
import { AdminMiddleware } from '@middlewares/admin.middleware'

@JsonController()
@Service()
export class Hr_gameController extends BaseController {
  constructor(protected hr_gameRepository: Hr_gameRepository, protected GameRepository: GameRepository) {
    super()
  }

  @Authorized()
  @UseBefore(AdminMiddleware)
  @Post('/add-hr-to-game')
  async addHrToGame(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data: Hr_gameDto = req.body;
      await this.hr_gameRepository.create(data)
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

  // @Get('/hr-in-game')
  // async getAllGamesHrIn(@Req() req: Request, @Res() res: Response, next: NextFunction) {
  //   try {
  //     const id = req.body.hr_id;
  //     console.log(this.hr_gameRepository);
  //     const games = await this.GameRepository.findAllByCondition({
  //       attributes: ['type'],
  //       include: [{
  //         model: DB.sequelize.models.Hr_game,
  //         where: {id: id},
  //       }],
  //     });
  //     return this.setData(games).setMessage('Success').responseSuccess(res);
  //   } catch (error) {
  //     console.log(error);
  //     return this.setMessage('Error').responseErrors(res)
  //   }
  // }
}