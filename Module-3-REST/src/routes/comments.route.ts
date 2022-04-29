import express,{ Router } from "express"
import asyncHandler from 'express-async-handler'
import {
    find as findComments,
    update,
    deleteComment,
    create as createComment
} from '../controllers/comments.controller'
import {
    findLikesComment ,
    updateLikeComment ,
    deleteLikeComment
} from '../controllers/likes.controller'
const router = express.Router({mergeParams:true})
export function commentsRoutes(): Router {
    router
        .route('/')
        // .all(passport.authenticate('jwt', {session:false}))
        .get(asyncHandler(findComments))
        .post(asyncHandler(createComment))
    
    router
        .route('/:idComment')
        // .all(passport.authenticate('jwt', {session:false}))
        .patch(asyncHandler(update))
        .delete(asyncHandler(deleteComment))   
    router
        .route('/:idComment/likes')
        // .all(passport.authenticate('jwt', {session:false}))
        .get(asyncHandler(findLikesComment))
        .patch(asyncHandler(updateLikeComment))
    router
        .route('/:idComment/likes/:idLike')
        .delete(asyncHandler(deleteLikeComment))   
    return router
}