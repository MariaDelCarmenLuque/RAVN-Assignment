import express, {Router} from 'express'
import asyncHandler from 'express-async-handler'
import passport from 'passport'
import {
    find as findUsers,
    update,
    deleteUser,
    findOne,
} from '../controllers/users.controller'

import { validateAdmin, validateUser } from '../guards/user.guard'
const router =express.Router()

export function usersRoutes(): Router {
    router
        .route('/')
        .all(passport.authenticate('jwt', {session:false}),validateAdmin)
        .get(asyncHandler(findUsers))

    // router
    //     .route('/me')
    //     .all(passport.authenticate('jwt', {session:false}))
    //     .get(asyncHandler(me))
    //     .patch(asyncHandler(updateMe))
    
    router
        .route('/:id')
        .all(passport.authenticate('jwt', {session:false}),validateAdmin)
        .get(asyncHandler(findOne))
        .patch(asyncHandler(update))
        .delete(asyncHandler(deleteUser))   
    return router
}