import express,{ Router } from "express"
import asyncHandler from 'express-async-handler'
import {
    find as findComments,
    update,
    deleteComment,
    create as createComment
} from '../controllers/comments.controller'
const router = express.Router()
export function commentsRoutes(): Router {
    router
        .route('/:idPost/comments')
        // .all(passport.authenticate('jwt', {session:false}))
        .get(asyncHandler(findComments))
        .post(asyncHandler(createComment))
    
    router
        .route('/:idPost/comments/:idComment')
        // .all(passport.authenticate('jwt', {session:false}))
        .patch(asyncHandler(update))
        .delete(asyncHandler(deleteComment))   
    return router
}