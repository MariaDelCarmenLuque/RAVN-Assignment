import express,{ Router } from "express"
import asyncHandler from 'express-async-handler'
import {
    find as findPosts,
    update,
    deletePost,
    findOne,
    create as createPost
} from '../controllers/posts.controller'

import {
    findLikesPost,
    updateLikePost,
    deleteLike
} from '../controllers/likes.controller'
import passport from "passport"
import { validateAdmin, validateUser } from "../guards/user.guard"

const router = express.Router()
export function postsRoutes(): Router {
    router
        .route('/')
        .get(asyncHandler(findPosts))
        .post(passport.authenticate('jwt', {session:false}),validateUser,asyncHandler(createPost))
    
    router
        .route('/:idPost')
        .get(asyncHandler(findOne))
        .patch(passport.authenticate('jwt', {session:false}),validateUser,asyncHandler(update))
        .delete(passport.authenticate('jwt', {session:false}),asyncHandler(deletePost))  
    router
        .route('/:idPost/likes')
        .all(passport.authenticate('jwt', {session:false}),validateUser)
        .get(asyncHandler(findLikesPost))
        .patch(asyncHandler(updateLikePost))
    router
        .route('/:idPost/likes/:idLike')
        .all(passport.authenticate('jwt', {session:false}),validateUser)
        .delete(asyncHandler(deleteLike))   
    return router
}