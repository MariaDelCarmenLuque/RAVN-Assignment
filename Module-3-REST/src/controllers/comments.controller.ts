import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { CreateCommentDto } from "../dtos/comments/request/create-comment.dto";
import { UpdateCommentDto } from "../dtos/comments/request/update-comment.dto";
import { CommentDto } from "../dtos/comments/response/comment.dto";
import { prisma } from "../prisma";
import { CommentsService } from "../services/comments.service";

export async function find(req:Request, res: Response): Promise<void>{
   const comments = await CommentsService.find(parseInt(req.params.idPost))
   res.status(200).json(comments)
}
export async function create(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(CreateCommentDto, req.body)
  await dto.isValid()
  const comment = await CommentsService.create(dto,parseInt(req.params.idPost))
  res.status(201).json( comment)
}
export async function update(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(UpdateCommentDto, req.body)
  await dto.isValid()
  const comment = await CommentsService.update(parseInt(req.params.idComment), dto)

  res.status(200).json(comment)
}

export async function deleteComment(req: Request, res:Response): Promise<void> {
  const post = await CommentsService.delete(parseInt(req.params.idComment))
     
  res.status(200).json('Comment deleted')
}