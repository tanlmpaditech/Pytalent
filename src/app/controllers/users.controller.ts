import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import UserRepository from '@repositories/user.repository'
import { AuthRequest } from '@interfaces/response.interface'
import { UserDto } from 'dtos/user.dto'
import { AdminMiddleware } from '@middlewares/admin.middleware'
import bcrypt from 'bcrypt'

@JsonController()
@Service()
export class UsersController extends BaseController {
  constructor(protected userRepository: UserRepository) {
    super()
  }

  @Authorized()
  @UseBefore(AdminMiddleware)
  @Get('/users')
  async getUser(@Req() req: AuthRequest, @Res() res: any, next: NextFunction) {
    try {
      const findAllUsersData = await this.userRepository.getAll()
      return this.setData(findAllUsersData).setMessage('Success').responseSuccess(res)
    } catch (error) {
      return this.setData('').setMessage('Error').responseErrors(res)
    }
  }

  @Authorized()
  @UseBefore(AdminMiddleware)
  @Get('/user/:id')
  async getUserDetail(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const id = +req.params.id;
      const findUserById = await this.userRepository.findById(id);
      return this.setData(findUserById).setMessage('Get user detail successfully').responseSuccess(res);
    } catch (error) {
      return this.setData('').setMessage('Error').responseErrors(res);
    }
  }

  @Authorized()
  @UseBefore(AdminMiddleware)
  @Post('/create-user')
  async createUser(@Req() req: AuthRequest, @Res() res: Response, next: NextFunction) {
    try {
      const data : UserDto = req.body
      const hashPassword = bcrypt.hashSync(req.body.password, 10);
      const userExistedByEmail = await this.userRepository.findByCondition(req.body.email);
      if(userExistedByEmail) {
        return this.setData('').setMessage('User existed').responseErrors(res)
      }
      const userCreated = {
        name: data.name,
        email: data.email,
        password: hashPassword,
        role_id: data.role_id
      }
      await this.userRepository.create(userCreated)
      return this.setData(userCreated).setMessage('Success').responseSuccess(res);
    } catch (error) {
      return this.setData('').setMessage('Error').responseErrors(res)
    }
  }
}

export default UsersController
