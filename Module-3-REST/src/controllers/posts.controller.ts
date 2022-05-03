import { Request, Response } from "express"
import { plainToClass } from "class-transformer"
import { PostDto } from "../dtos/posts/response/post.dto"
import { PostsService } from "../services/posts.service"
import { UpdatePostDto } from "../dtos/posts/request/update-post.dto"
import { CreatePostDto } from "../dtos/posts/request/create-post.dto"


export async function find(req:Request, res: Response): Promise<void>{
    const posts = await PostsService.find()
    res.status(200).json(posts)
}
export async function findOne(req: Request, res: Response): Promise<void> {
    const post = await PostsService.findOne(parseInt(req.params.idPost))
    if(!post){
      res.status(404).json('Post Not Found')
    } else {res.status(200).json(post)}
    
  }
  export async function create(req: Request, res: Response): Promise<void> {
    const dto = plainToClass(CreatePostDto, req.body)
    await dto.isValid()
    const post = await PostsService.create(dto)
  
    res.status(201).json( post)
  }
  export async function update(req: Request, res: Response): Promise<void> {
    const dto = plainToClass(UpdatePostDto, req.body)
    await dto.isValid()
    const post = await PostsService.update(parseInt(req.params.idPost), dto)
  
    res.status(200).json(post)
  }

  export async function deletePost(req: Request, res:Response): Promise<void> {
      const post = await PostsService.findOne(parseInt(req.params.idPost))
      if(!post){
        res.status(404).json('Post Not Found')
      } else {
        await PostsService.delete(parseInt(req.params.idPost))
        res.status(200).json('Post deleted')}
  }