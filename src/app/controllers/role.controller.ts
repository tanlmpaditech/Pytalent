import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import RoleRepository from '@repositories/role.repository'

@JsonController()
@Service()
export class RoleController extends BaseController {
  constructor(protected roleRepository: RoleRepository) {
    super()
  }

  return;
}

