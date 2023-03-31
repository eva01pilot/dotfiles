import { NextApiRequest, NextApiResponse } from "next";
import PrismaClient from '../../../server/db'
import jwt from 'jsonwebtoken'
export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method==='GET'){
        res.setHeader("Access-Control-Allow-Credentials", 'true')
        const cookie = req.cookies
        const access_token = cookie['access_token']
        const payload = jwt.decode(access_token as string)
        res.json({
            cook: req.cookies
        })
    }
}