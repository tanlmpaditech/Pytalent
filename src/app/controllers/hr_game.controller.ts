import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import Hr_gameRepository from '@repositories/hr_game.repository'

@JsonController()
@Service()
export class Hr_gameController extends BaseController {
  constructor(protected hr_gameRepository: Hr_gameRepository) {
    super()
  }

  return;
}