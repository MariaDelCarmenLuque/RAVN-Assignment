import { User } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import { Unauthorized } from 'http-errors'
import { AuthService } from '../services/auth.service'
import { Authenticated } from '../utils/types'

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.user) {
    throw new Unauthorized('You must need a token')
  }

  AuthService.validateUser(req.user as Authenticated<User>)

  next()
}

export const validateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.user) {
    throw new Unauthorized('You must need a token')
  }
  console.log(req.user)
  AuthService.validateAdmin(req.user as Authenticated<User>)
  next()
}
