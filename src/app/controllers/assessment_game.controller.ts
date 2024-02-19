import { Authorized, Delete, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import Assessment_gameRepository from '@repositories/assessment_game.repository'
import { HrAuthMiddleware } from '@middlewares/hr_auth.middleware'
import AssessmentRepository from '@repositories/assessment.repository'
import Hr_gameRepository from '@repositories/hr_game.repository'

@JsonController()
@Service()
export class Assessment_gameController extends BaseController {
  constructor(protected Assessment_gameRepository: Assessment_gameRepository, protected assessmentRepository: AssessmentRepository, protected Hr_gameRepository: Hr_gameRepository) {
    super()
  }

  @Authorized()
  @UseBefore(HrAuthMiddleware)
  @Post('/add-game-to-assessment')
  async addGameToAssessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data: Assessment_gameRepository = req.body;
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim();
      const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
      const hr_id = payload.id;
      const FindGameHrIn = await this.Hr_gameRepository.findAllByCondition({
        attributes: ['game_id'],
        where: {hr_id: hr_id}
      })
      const AllGamesHrIn = FindGameHrIn.map((game_id) => game_id.dataValues.game_id)
      if(!AllGamesHrIn.includes(req.body.game_id)) {
        return this.setMessage('Can not add this game to assessment').responseErrors(res)
      }
      // await this.Assessment_gameRepository.create(data)
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      console.log(error);
      return this.setMessage('Error').responseErrors(res)
    }
  }

  @Post('/delete-game-from-assessment/:assessment_id')
  async deleteGameFromAssessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const assessment_id = req.params.assessment_id;
      const game_id = req.body.game_id;
      // console.log(this.Assessment_gameRepository);
      const data = await this.Assessment_gameRepository.findByCondition({
        where: {assessment_id: assessment_id, game_id: game_id}
      })
      if(!data) {
        return this.setMessage('Error').responseErrors(res)
      }
      await this.Assessment_gameRepository.deleteById(data.id)
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }
}