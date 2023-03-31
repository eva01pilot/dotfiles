import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method==='GET'){

    }
    if(req.method==='POST'){
        const tshirtSchema = z.object({
            image: z.number(),
            for_sale: z.boolean(),
        })
        if(!tshirtSchema.parse(req.body)){
            res.status(400).json({
                error: 'Неправильные данные'
            })
        }
        const cookie = req.cookies
        const access_token = cookie['access_token'] as string
        const payload = jwt.decode(access_token as string)
        if(typeof payload==='string' || !payload) return res.status(200).json({
            no:'no'
        })
        const ID = payload.login
    }
}