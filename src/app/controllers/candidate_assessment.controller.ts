import { Authorized, Get, JsonController, Post, Put, Req, Res, UseBefore } from 'routing-controllers'
import { NextFunction, Response } from 'express'
import { BaseController } from './base.controller'
import { Service } from 'typedi'
import Candidate_assessmentRepository from '@repositories/candidate_assessment.repository'

@JsonController()
@Service()
export class Candidate_assessmentController extends BaseController {
  constructor(protected candidate_assessmentRepository: Candidate_assessmentRepository) {
    super()
  }

  return;
}