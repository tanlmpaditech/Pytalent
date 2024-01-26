import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import UserRepository from '@repositories/user.repository'
import { AuthMiddleware } from '@middlewares/auth.middleware'
import { AuthRequest } from '@interfaces/response.interface'
import { UserDto } from 'dtos/user.dto'
import { plainToClass } from 'class-transformer'
import { AdminMiddleware } from '@middlewares/admin.middleware'

@JsonController('/user')
@Service()
export class UsersController extends BaseController {
  constructor(protected userRepository: UserRepository) {
    super()
  }

  @Authorized()
  @UseBefore(AdminMiddleware)
  @Get('/users')
  async getUser(@Req() req: any, @Res() res: any, next: NextFunction) {
    try {
      const findAllUsersData = await this.userRepository.getAll()
      return this.setData(findAllUsersData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }

  @Authorized()
  @UseBefore(AuthMiddleware)
  @Get('/user/:id')
  async getUserDetail(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const findUserById = await this.userRepository.findById(id);
      return this.setData(findUserById).setMessage('Get user detail successfully').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AdminMiddleware)
  @Post('/create-user')
  async createUser(@Req() req: any, @Res() res: Response, next: NextFunction) {
    try {
      const data = plainToClass(UserDto, req.body)
      console.log(data);
      await this.userRepository.create(data)
      return this.setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setMessage('Error').responseErrors(res)
    }
  }
}

export default UsersController
