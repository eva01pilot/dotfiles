import { NextApiRequest, NextApiResponse } from "next";
import PrismaClient from '../../../server/db'
import jwt from 'jsonwebtoken'
import { z } from "zod";
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method==='GET'){
        const cookie = req.cookies
        const access_token = cookie['access_token'] as string
        const payload = jwt.decode(access_token as string)
        console.log(payload)
        if(typeof payload==='string' || !payload) return res.status(200).json({
            no:'no'
        })
        const ID = payload.ID
        
        const tshirts = await PrismaClient.tshirt.findMany({
            where:{
               created_by_ID: ID
            }
        })
        return res.status(200).json({
            tshirts
        })
    }
    if(req.method==='POST'){
        const userSchema = z.object({
            image_complete64: z.string(),
            color: z.string().length(7),
            prompt: z.string(),
            image_print64: z.string()
        })
        if(!userSchema.parse(req.query)){
            res.status(400).json({
                error: 'Неправильные данные'
            })
        }
    }
}