import User from "@models/entities/user.entity";
import { Request } from "express";

export interface ApiResponse {
  status: boolean
  code: number
  data: any
  message: string,
  stack?: string
}

export interface AuthRequest extends Request {
  user: User;
}
