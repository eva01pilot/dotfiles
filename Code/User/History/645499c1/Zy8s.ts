import { NextApiRequest, NextApiResponse } from "next";
import PrismaClient from '../../../server/db'
import jwt from 'jsonwebtoken'
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method==='GET'){
        const cookie = req.headers.cookie
        const access_token = cookie as string
        const payload = jwt.decode(access_token as string)
        res.status(200).json({
            payload
        })
    }
}