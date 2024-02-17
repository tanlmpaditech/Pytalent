import { Authorized, Delete, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import Hr_gameRepository from '@repositories/hr_game.repository'
import { Hr_gameDto } from 'dtos/hr_game.dto'

@JsonController()
@Service()
export class Hr_gameController extends BaseController {
  constructor(protected hr_gameRepository: Hr_gameRepository) {
    super()
  }

  @Post('/add-hr-to-game')
  async addHrToGame(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data: Hr_gameDto = req.body;
      console.log(data);
      await this.hr_gameRepository.create(data)
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

  // // @Authorized()
  // // @UseBefore(AuthMiddleware)
  // @Delete('/delete-assessment/:id')
  // async deleteAssessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     await this.hr_gameRepository.deleteById(id)
  //     return this.setMessage('Success').responseSuccess(res);
  //   } catch (error) {
  //     return this.setMessage('Error').responseErrors(res);
  //   }
  // }
}