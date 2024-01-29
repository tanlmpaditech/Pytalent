import { Authorized, Delete, JsonController, Post, Req, Res, UseBefore } from "routing-controllers";
import { Service } from "typedi";
import { BaseController } from "./base.controller";
import AssessmentRepository from "@repositories/assessment.repository";
import { AuthMiddleware } from "@middlewares/auth.middleware";
import { NextFunction, Request, Response } from "express";
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
  async createAssessment(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data: AssessmentDto = req.body;
      console.log(data);
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
}