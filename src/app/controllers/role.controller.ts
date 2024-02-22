import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Request, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import RoleRepository from '@repositories/role.repository'

@JsonController()
@Service()
export class RoleController extends BaseController {
  constructor(protected roleRepository: RoleRepository) {
    super()
  }

  async addUrl(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const data = req.body;
      await this.roleRepository.create(data)
      return this.setData(data).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }
}

