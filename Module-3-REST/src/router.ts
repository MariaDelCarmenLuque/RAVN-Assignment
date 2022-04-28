import express, { Router } from 'express'
import { postsRoutes } from './routes/posts.route'
import { usersRoutes } from './routes/users.route'
const expressRouter = express.Router()
export function router(app:Router):Router {
    // app.use('/api/v1/auth', authRoutes())
    app.use('/api/v1/accounts', usersRoutes())
    app.use('/api/v1/posts', postsRoutes())
    return expressRouter
}
