import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import MemoryRepository from '@repositories/memory.repository'

@JsonController()
@Service()
export class MemoryController extends BaseController {
  constructor(protected memoryRepository: MemoryRepository) {
    super()
  }

  return;
}