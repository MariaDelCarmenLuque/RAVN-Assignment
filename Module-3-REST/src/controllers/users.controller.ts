import { Request,Response } from "express"
import { plainToClass, plainToInstance } from "class-transformer"
import { UsersService } from "../services/users.service"
import { CreateUserDto } from "../dtos/users/request/create-user.dto"
import { UpdateUserDto } from "../dtos/users/request/update-user.dto"

export async function find(req:Request, res:Response):Promise<void> {
    const users = await UsersService.find()
    res.status(200).json(users)
}
  
  export async function findOne(req: Request, res: Response): Promise<void> {
    const user = await UsersService.findOne(parseInt(req.params.id))
  
    res.status(200).json(user)
  }
  export async function register(req:Request,res:Response): Promise<void> {
    const dto = plainToClass(CreateUserDto, req.body)
    await dto.isValid()
  
    const user = await UsersService.create(dto)
  
    res.status(201).json(user)
}
  export async function update(req: Request, res: Response): Promise<void> {
    const dto = plainToClass(UpdateUserDto, req.body)
    await dto.isValid()
    const user = await UsersService.update(parseInt(req.params.id), dto)
  
    res.status(200).json(user)
  }

  export async function deleteUser(req: Request, res:Response): Promise<void> {
      const user = await UsersService.delete(parseInt(req.params.id))
      res.status(200).json('User deleted')
  }