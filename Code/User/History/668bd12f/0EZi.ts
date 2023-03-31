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
        console.log(req.body)
        // if(!userSchema.parse(req.body)){
        //     console.log(req)
        //     res.status(400).json({
        //         error: 'Неправильные данные'
        //     })
        // }
        const hashedPassword = await generatePasswordHash(10, req.body.password)
        const loginIsOccupied = await PrismaClient.user.findFirst({
            where: {
                login: req.body.login
            }
        })
        if(loginIsOccupied?.id){
            res.status(400).json({
                error: 'Никнейм уже занят'
            })
        }
        const User = await PrismaClient.user.create({
            data:{
                login: req.body.login,
                password: hashedPassword,
                avatar: req.body.avatar,
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
