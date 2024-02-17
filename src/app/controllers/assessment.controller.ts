import { Authorized, Delete, Get, JsonController, Post, Put, Req, Res, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import { BaseController } from "./base.controller";
import AssessmentRepository from "@repositories/assessment.repository";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { NextFunction, Request, Response } from "express";
import { AssessmentDto } from "dtos/assessment.dto";
import { Op } from "sequelize";

@JsonController()
@Service()
export class AssessmentController extends BaseController {
  constructor(protected assessmentRepository: AssessmentRepository) {
    super()
  }

  // @Authorized()
  // @UseBefore(AuthMiddleware)
  @Post('/create-assessment')
  async createAssessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const currentDate = new Date();
      const data: AssessmentDto = req.body;
      if(data.end < currentDate) {
        return this.setMessage('Error').responseErrors(res)
      }
      await this.assessmentRepository.create(data)
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

  // @Authorized()
  // @UseBefore(AuthMiddleware)
  @Delete('/delete-assessment/:id')
  async deleteAssessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.assessmentRepository.deleteById(id)
      return this.setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res);
    }
  }

  @Get('/assessment/:id')
  async getAssessmentById(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const assessment = await this.assessmentRepository.findById(+id)
      return this.setData(assessment).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res);
    }
  }

  @Get('/assessments')
  async getAssessments(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const currentDate = new Date();
      const assessments = await this.assessmentRepository.findAllByCondition({
        where: {
          status: 'active',
          end: { [Op.gt]: currentDate }
        }
      })
      // assessments.map(async (assessment) => {
      //   if(assessment.dataValues.end > currentDate) {
      //     console.log(assessment);
      //     assessment.update(assessment.end = 'closed')
      //   }
      // });
      return this.setData(assessments).setMessage('Success').responseSuccess(res);
    } catch (error) {
      console.log(error);
      return this.setMessage('Error').responseErrors(res);
    }
  }

  @Put('/assessment/change-status/:id')
  async changeStatusAssessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const assessment = await this.assessmentRepository.findById(+id)
      const newAssessment = assessment.update(req.body);
      return this.setData(newAssessment).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res);
    }
  }
}