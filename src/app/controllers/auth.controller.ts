import { BadRequestError, JsonController, Post, Req, Res } from "routing-controllers";
import { Service } from "typedi";
import { BaseController } from "./base.controller";
import { ethers } from 'ethers';
import UserRepository from "@repositories/user.repository";
import { NextFunction, Request, Response } from "express";
import { LoginDto } from "dtos/auth.dto";
import { loginMessage } from "@utils/message";
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
        const loginDto: LoginDto = req.body;
        const { address, signature } = loginDto;
        const data = await this.authRepository.findByAddress(address)
        // console.log(data);
        const user = data[0];
        const message = loginMessage(address);
        const verifyAddress = ethers.verifyMessage(message, signature);
        // console.log(verifyAddress);

        if(verifyAddress.toUpperCase() !== address.toUpperCase()) {
          throw new BadRequestError('Wrong credentials');
        }

        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user)
        setCacheExpire(`auth_refresh_address_${address}`, refreshToken, REFRESH_TTL);
        return this.setData({ accessToken, refreshToken }).setCode(200).setMessage('Success').responseSuccess(res);
    } catch (error) {
        return this.setCode(error.code || 500)
          .setMessage(error.message || 'Internal Server Error')
          .responseErrors(res);
    }
  }
}

export default AuthController;