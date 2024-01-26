import { Authorized, Delete, JsonController, Post, Req, Res, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import { BaseController } from "./base.controller";
import AssessmentRepository from "@repositories/assessment.repository";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { NextFunction, Response } from "express";
import { plainToClass } from "class-transformer";
import { AssessmentDto } from "dtos/assessment.dto";

@JsonController()
@Service()
export class AssessmentController extends BaseController {
  constructor(protected assessmentRepository: AssessmentRepository) {
    super()
  }

  // @Authorized()
  // @UseBefore(AuthMiddleware)
  @Post('/create-assessment')
  async createAssessment(@Req() req: any, @Res() res: Response, next: NextFunction) {
    try {
      // const data = plainToClass(AssessmentDto, req.body)
      const data = req.body;
      console.log(data);
      await this.assessmentRepository.create(data)
      return this.setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Delete('/delete-assessment')
  async deleteAssessment(@Req() req: any, @Res() res: Response, next: NextFunction) {
    try {
      const { id } = req.body;
      await this.assessmentRepository.deleteById(id)
      return this.setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res);
    }
  }
}