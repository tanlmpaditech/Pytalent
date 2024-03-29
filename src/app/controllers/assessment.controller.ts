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
      return this.setData('').setMessage('Error').responseErrors(res);
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
        where: {assessment_id: id},
        include: [{
          attributes: ['candidate_id'],
          model: DB.sequelize.models.Candidate_assessment
        }]
      })
      if(!assessment) {
        return this.setData('').setMessage('Assessment is not existed').responseErrors(res);
      }
      const candidate_id_in_assessment = assessment.candidate_assessment.map((dataValues) =>
        dataValues.candidate_id
      );
      const hr_id_create_assessment = assessment.hr_id;
     
      if(!candidate_id_in_assessment.includes(+user_id) && hr_id_create_assessment !== user_id) {
        return this.setData('').setMessage('You do not have permission').responseErrors(res)
      }
      
      return this.setData(assessment).setMessage('Success').responseSuccess(res);
    } catch (error) {
      console.log(error);
      return this.setData('').setMessage('Error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(HrAuthMiddleware)
  @Post('/create-assessment')
  async createAssessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const assessment_id = req.body.assessment_id;
      const existed = await this.assessmentRepository.findById(assessment_id)
      if(existed) {
        return this.setData('').setMessage('Assessment ID is existed').responseSuccess(res);
      }
      const currentDate = new Date();
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim();
      const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
      const hr_id = payload.id;
      const data: AssessmentDto = {...req.body, hr_id}
      
      if(data.end < currentDate) {
        return this.setData('').setMessage('Date end error').responseErrors(res)
      }
      await this.assessmentRepository.create(data)
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      console.log(error);
      return this.setData('').setMessage('Error').responseErrors(res)
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
        return this.setData('').setMessage('Assessment is not existed').responseErrors(res);
      }
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim();
      const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
      const hr_id = payload.id;
      if(assessment.hr_id !== hr_id) {
        return this.setData('').setMessage('You do not have permission to delete this assessment').responseErrors(res);
      }
      await this.assessmentRepository.deleteById(id)
      return this.setData(assessment).setMessage('Success').responseSuccess(res);
    } 
    catch (error) {
      console.log(error);
      return this.setData('').setMessage('Error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(HrAuthMiddleware)
  @Put('/assessment/update/:id')
  async changeStatusAssessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const assessment = await this.assessmentRepository.findById(+id);
      const accessToken = req.headers.authorization.split('Bearer ')[1].trim();
      const payload = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString());
      const hr_id = payload.id;
      if(assessment.hr_id !== hr_id) {
        return this.setData('').setMessage('You do not have permission to update the assessment').responseErrors(res);
      }
      const newAssessment = assessment.update(req.body);
      return this.setData(newAssessment).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setData('').setMessage('Error').responseErrors(res);
    }
  }
}