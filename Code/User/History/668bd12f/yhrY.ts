import  PrismaClient  from '../../../server/db'
import { z } from 'zod'
import express, {Request, Response} from 'express';
export default async function handler(req : Request, res: Response){
    if(req.method==='POST'){
        const userSchema = z.object({
            login: z.string().min(4),
            password: z.string(),
            avatar: z.string()
        })
        if(!userSchema.parse(req.body)){
            res.status(400).json({
                error: 'Неправильные данные'
            })
        }
        PrismaClient.user.create({
            data:{
                login: req.body.login,
                password: req.body.password,
                avatar: req.body.avatar,
            }
        })
    }
}
z.