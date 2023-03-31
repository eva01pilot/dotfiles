import { NextApiRequest, NextApiResponse } from "next";
import PrismaClient from '../../../server/db'
import jwt from 'jsonwebtoken'
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method==='GET'){
        const cookie = req.cookies
        const access_token = cookie['access_token'] as string
        const payload = jwt.decode(access_token as string)
        if(typeof payload==='string' || !payload) return
        const login = payload.login
        PrismaClient.tshirt.findFirst({
            where:{
                
            }
        })
        return res.status(200).json({
            payload
        })
    }
    if(req.method==='POST'){
        return res.status(200).json({
            ok:'ok'
        })
    }
}