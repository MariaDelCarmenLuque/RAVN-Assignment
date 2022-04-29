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
const router = express.Router()
export function postsRoutes(): Router {
    router
        .route('/')
        // .all(passport.authenticate('jwt', {session:false}))
        .get(asyncHandler(findPosts))
        .post(asyncHandler(createPost))
    
    router
        .route('/:idPost')
        // .all(passport.authenticate('jwt', {session:false}))
        .get(asyncHandler(findOne))
        .patch(asyncHandler(update))
        .delete(asyncHandler(deletePost))  
    router
        .route('/:idPost/likes')
        // .all(passport.authenticate('jwt', {session:false}))
        .get(asyncHandler(findLikesPost))
        .patch(asyncHandler(updateLikePost))
    router
        .route('/:idPost/likes/:idLike')
        .delete(asyncHandler(deleteLike))   
    return router
}