import  PrismaClient  from '../../../server/db'
import { z } from 'zod'
import {Request, Response} from 'express';
import generatePasswordHash from '../../../helpers/generatePasswordHash'
import jwt from 'jsonwebtoken'

export default async function handler(req : Request, res: Response){
    if(req.method==='POST'){
        const userSchema = z.object({
            login: z.string().min(4),
            password: z.string(),
            avatar: z.string()
        })
        console.log(req)
        if(!userSchema.parse(req.query)){
            res.status(400).json({
                error: 'Неправильные данные'
            })
        }
        const hashedPassword = await generatePasswordHash(10, req.query.password as string)
        const loginIsOccupied = await PrismaClient.user.findFirst({
            where: {
                login: req.query.login as string
            }
        })
        if(loginIsOccupied?.id){
            res.status(400).json({
                error: 'Никнейм уже занят'
            })
        }
        const User = await PrismaClient.user.create({
            data:{
                login: req.query.login as string,
                password: hashedPassword,
                avatar: req.query.avatar as string,
            }
        })
        const accessToken = jwt.sign(User.login, process.env.JWT_SECRET as string,{
            expiresIn: "7d"
        })
        res.cookie('access_token', accessToken, {
            httpOnly:true,
        })
        res.status(200).json({
            ...User,
        })
    }
}
