import { plainToClass} from "class-transformer";
import { Request, Response } from "express";
import { CreateLikeDto } from "../dtos/likes/request/create-like.dto";
import { LikesService } from "../services/likes.service";

export async function findLikesComment(req: Request, res: Response): Promise<void> {
    const likes = await LikesService.findLikes(parseInt(req.params.idComment))
  
    res.status(200).json(likes)
  }
export async function updateLikeComment(req: Request, res: Response): Promise<void> {
  const dto = plainToClass(CreateLikeDto, req.body)
  await dto.isValid()
 
  const updateLike = await LikesService.update(parseInt(req.params.idComment),parseInt(req.body.id), dto)
  
  res.status(200).json(updateLike)
}

export async function deleteLikeComment(req: Request, res:Response): Promise<void> {

  const like = await LikesService.deleteLikeComment(parseInt(req.params.idLike))
  res.status(200).json('Item Deleted')
}
export async function findLikesPost(req: Request, res: Response): Promise<void> {
  const likes = await LikesService.findLikesPost(parseInt(req.params.idPost))

  res.status(200).json(likes)
}
export async function updateLikePost(req: Request, res: Response): Promise<void> {
 
  const dto = plainToClass(CreateLikeDto, req.body)
  await dto.isValid()
 
  const updateLike = await LikesService.updateLikePost(parseInt(req.params.idPost),parseInt(req.body.id), dto)
  
  res.status(200).json(updateLike)
}
export async function deleteLike(req: Request, res:Response): Promise<void> {
  const like = await LikesService.deleteLike(parseInt(req.params.idLike))
  res.status(200).json('Item Deleted')
}