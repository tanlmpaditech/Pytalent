import { Authorized, Delete, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import Assessment_gameRepository from '@repositories/assessment_game.repository'
import { HrAuthMiddleware } from '@middlewares/hr_auth.middleware'
import AssessmentRepository from '@repositories/assessment.repository'
import Hr_gameRepository from '@repositories/hr_game.repository'
import GameRepository from '@repositories/game.repository'

@JsonController()
@Service()
export class Assessment_gameController extends BaseController {
  constructor(
    protected Assessment_gameRepository: Assessment_gameRepository, 
    protected AssessmentRepository: AssessmentRepository, 
    protected Hr_gameRepository: Hr_gameRepository,
    protected GameRepository: GameRepository
  ) {
    super()
  }

  @Authorized()
  @UseBefore(HrAuthMiddleware)
  @Post('/add-game-to-assessment')
  async addGameToAssessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim();
      const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
      const hr_id = payload.id;
      const assessment = await this.AssessmentRepository.findByCondition({
        where: {assessment_id: data.assessment_id}
      });
      if(!assessment) {
        return this.setData('').setMessage('Assessment ID is not existed');
      }
      const game = await this.GameRepository.findByCondition({
        where: {game_id: data.game_id}
      });
      if(!game) {
        return this.setData('').setMessage('Game ID is not existed');
      }
      const existed = await this.Assessment_gameRepository.findByCondition({
        where: {game_id: data.game_id, assessment_id: data.assessment_id}
      });
      if(existed) {
        return this.setData('').setMessage('Existed').responseErrors(res)
      }
      if(assessment.hr_id !== hr_id) {
        return this.setData('').setMessage('You do not have permission to access this assessment').responseErrors(res);
      }
      const FindGameHrIn = await this.Hr_gameRepository.findAllByCondition({
        attributes: ['game_id'],
        where: {hr_id: hr_id}
      })
      const AllGamesHrIn = FindGameHrIn.map((game_id) => game_id.dataValues.game_id)
      if(!AllGamesHrIn.includes(+data.game_id)) {
        return this.setData('').setMessage('Can not add this game to assessment').responseErrors(res)
      }
      await this.Assessment_gameRepository.create(data)
      return this.setData(data).setMessage('Success').responseSuccess(res);   
    } catch (error) {
      // console.log(error);
      return this.setData('').setMessage('Error').responseErrors(res)
    }
  }

  @Authorized()
  @UseBefore(HrAuthMiddleware)
  @Post('/delete-game-from-assessment/:assessment_id')
  async deleteGameFromAssessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const assessment_id = req.params.assessment_id;
      const game_id = req.body.game_id;
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim();
      const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
      const hr_id = payload.id;
      const assessment = await this.AssessmentRepository.findById(+assessment_id);

      if(assessment.hr_id !== hr_id) {
        return this.setData('').setMessage('You do not have permission').responseErrors(res); 
      };

      const data = await this.Assessment_gameRepository.findByCondition({
        where: {assessment_id: assessment_id, game_id: game_id}
      })

      if(!data) {
        return this.setData('').setMessage('Error').responseErrors(res)
      }
      
      await this.Assessment_gameRepository.deleteById(data.id)
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setData('').setMessage('Error').responseErrors(res)
    }
  }
}