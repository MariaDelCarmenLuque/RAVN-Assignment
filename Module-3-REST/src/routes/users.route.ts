import express, {Router} from 'express'
import asyncHandler from 'express-async-handler'
import {
    find as findUsers,
    update,
    deleteUser,
    findOne,
} from '../controllers/users.controller'
const router =express.Router()

export function usersRoutes(): Router {
    router
        .route('/')
        // .all(passport.authenticate('jwt', {session:false}))
        .get(asyncHandler(findUsers))

    // router
    //     .route('/me')
    //     .all(passport.authenticate('jwt', {session:false}))
    //     .get(asyncHandler(me))
    //     .patch(asyncHandler(updateMe))
    
    router
        .route('/:id')
        // .all(passport.authenticate('jwt', {session:false}))
        .get(asyncHandler(findOne))
        .patch(asyncHandler(update))
        .delete(asyncHandler(deleteUser))   
    return router
}