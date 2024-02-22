import { Authorized, Delete, Get, JsonController, Post, Put, Req, Res, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import { BaseController } from "./base.controller";
import AssessmentRepository from "@repositories/assessment.repository";
import { HrAuthMiddleware } from "@middlewares/hr_auth.middleware";
import { NextFunction, Request, Response } from "express";
import { AssessmentDto } from "dtos/assessment.dto";
import { Op } from "sequelize";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import DB from "@models/index";

@JsonController()
@Service()
export class AssessmentController extends BaseController {
  constructor(protected assessmentRepository: AssessmentRepository) {
    super()
  }

  @Authorized()
  @UseBefore(HrAuthMiddleware)
  @Get('/assessments')
  async getAssessments(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const currentDate = new Date();
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim();
      const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
      const hr_id = payload.id;
      const assessments = await this.assessmentRepository.findAllByCondition({
        where: {
          end: { [Op.gt]: currentDate },
          status: 'active',
          hr_id: hr_id,
        }
      })
      return this.setData(assessments).setMessage('Success').responseSuccess(res);
    } catch (error) {
      console.log(error);
      return this.setMessage('Error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Get('/assessment/:id')
  async getAssessmentById(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      // const assessment = await this.assessmentRepository.findById(+id)
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim();
      const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
      const user_id = payload.id;
      const assessment = await this.assessmentRepository.findByCondition({
        where: {id: id},
        include: [{
          attributes: ['candidate_id'],
          model: DB.sequelize.models.Candidate_assessment
        }]
      })
      if(!assessment) {
        return this.setMessage('Assessment is not existed').responseErrors(res);
      }
      const candidate_id_in_assessment = assessment.candidate_assessment.map((dataValues) =>
        dataValues.candidate_id
      );
      // console.log(candidate_id_in_assessment);
      const hr_id_create_assessment = assessment.hr_id;
     
      if(!candidate_id_in_assessment.includes(user_id) && hr_id_create_assessment !== user_id) {
        return this.setMessage('You do not have permission').responseErrors(res)
      }
      
      return this.setData(assessment).setMessage('Success').responseSuccess(res);
    } catch (error) {
      console.log(error);
      return this.setMessage('Error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(HrAuthMiddleware)
  @Post('/create-assessment')
  async createAssessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const currentDate = new Date();
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim();
      const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
      const hr_id = payload.id;
      const data: AssessmentDto = {...req.body, hr_id};
      if(data.end < currentDate) {
        return this.setMessage('Error').responseErrors(res)
      }
      await this.assessmentRepository.create(data)
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

  @Authorized()
  @UseBefore(HrAuthMiddleware)
  @Delete('/delete-assessment/:id')
  async deleteAssessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const assessment = await this.assessmentRepository.findById(+id);
      if(!assessment) {
        return this.setMessage('Assessment is not existed').responseErrors(res);
      }
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim();
      const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
      const hr_id = payload.id;
      if(assessment.hr_id !== hr_id) {
        return this.setMessage('You do not have permission to delete this assessment').responseErrors(res);
      }
      await this.assessmentRepository.deleteById(id)
      return this.setMessage('Success').responseSuccess(res);
    } catch (error) {
      console.log(error);
      return this.setMessage('Error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(HrAuthMiddleware)
  @Put('/assessment/change-status/:id')
  async changeStatusAssessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const assessment = await this.assessmentRepository.findById(+id);
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim();
      const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
      const hr_id = payload.id;
      if(assessment.hr_id !== hr_id) {
        return this.setMessage('You do not have permission to change status').responseErrors(res);
      }
      const newAssessment = assessment.update(req.body);
      return this.setData(newAssessment).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res);
    }
  }


}