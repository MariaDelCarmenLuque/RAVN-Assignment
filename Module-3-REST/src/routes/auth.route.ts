import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
import { login, logout } from '../controllers/auth.controller'
import { register } from '../controllers/users.controller'


const router = express.Router()

export function authRoutes(): Router {
  router
  .route('/login')
  .post(asyncHandler(login))
  router
  .route('/logout')
  .post(asyncHandler(logout))
  router
  .route('/register')
  .post(asyncHandler(register))
//   router.route('/confirmUser').post(asyncHandler(confirmUser))

  return router
}