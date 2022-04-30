import { plainToClass } from "class-transformer";
import { Request,Response } from "express";
import { LoginDto } from "../dtos/auths/request/login.dto";
import { AuthService } from "../services/auth.service";


export async function login(req:Request,res:Response) {
    const dto= plainToClass (LoginDto, req.body)
    await dto.isValid()

    const result = await AuthService.login(dto)
    res.status(200).json(result)
}

// export async function logout(req: Request, res: Response): Promise<void> {
//     res.status(204).send()
//   }