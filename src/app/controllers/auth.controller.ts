import { BadRequestError, JsonController, Post, Req, Res } from "routing-controllers";
import { Service } from "typedi";
import { BaseController } from "./base.controller";
import UserRepository from "@repositories/user.repository";
import { NextFunction, Request, Response } from "express";
import { createAccessToken, createRefreshToken } from "@utils/token";
import { REFRESH_TTL } from "@utils/constants";
import { setCacheExpire } from "common/services/redis";

// @JsonController('/auth')
@JsonController()
@Service()
class AuthController extends BaseController {
  constructor(protected authRepository: UserRepository) {
    super();
  }

  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      if(!req.body.email || !req.body.password) {
        return this.setData('').setMessage('Missing username or password')
        .responseErrors(res);
      }
      const findUserByEmail = await this.authRepository.findByEmail(req.body.email)
      console.log(findUserByEmail.password);
      if(!findUserByEmail) {
        return this.setData('').setMessage('Username is not correct')
        .responseErrors(res);
      }
      if(findUserByEmail.password !== req.body.password) {
        return this.setData('').setMessage('Password is not correct')
        .responseErrors(res);
      }
      const accessToken = createAccessToken(findUserByEmail);
      const refreshToken = createRefreshToken(findUserByEmail)
      setCacheExpire(`auth_refresh_email_${req.body.email}`, refreshToken, REFRESH_TTL);
      
      return this.setData({accessToken, refreshToken}).setCode(200).setMessage('Success').responseSuccess(res);
    } catch (error) {
        return this.setCode(error.code || 500)
          .setMessage(error.message || 'Internal Server Error')
          .responseErrors(res);
    }
  }
}

export default AuthController;