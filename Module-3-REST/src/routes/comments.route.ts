import express,{ Router } from "express"
import asyncHandler from 'express-async-handler'
import passport from "passport"
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
import { validateUser } from "../guards/user.guard"
const router = express.Router({mergeParams:true})
export function commentsRoutes(): Router {
    router
        .route('/')
        .get(asyncHandler(findComments))
        .post(passport.authenticate('jwt', {session:false}),validateUser,asyncHandler(createComment))
    
    router
        .route('/:idComment')
        .all(passport.authenticate('jwt', {session:false}),validateUser)
        .patch(asyncHandler(update))
        .delete(asyncHandler(deleteComment))   
    router
        .route('/:idComment/likes')
        .get(asyncHandler(findLikesComment))
        .patch(passport.authenticate('jwt', {session:false}),validateUser,asyncHandler(updateLikeComment))
    router
        .route('/:idComment/likes/:idLike')
        .delete(passport.authenticate('jwt', {session:false}),validateUser,asyncHandler(deleteLikeComment))   
    return router
}