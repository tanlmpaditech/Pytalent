import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import GameRepository from '@repositories/game.repository'

@JsonController()
@Service()
export class GameController extends BaseController {
  constructor(protected gameRepository: GameRepository) {
    super()
  }

  return;
}