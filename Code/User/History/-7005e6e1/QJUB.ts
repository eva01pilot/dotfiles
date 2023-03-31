import { Request, Response } from "express";
import checkPasswordHash from "../../../helpers/checkPasswordHash";
import PrismaClient from '../../../server/db'
import jwt from 'jsonwebtoken'
import { setCookie } from "cookies-next";

export default async function handler(req:Request, res:Response){
    if(req.method==='GET'){
        const cookie = req.cookies
        const access_token = cookie['access_token']
        const exp = cookie['expires_in']
        if(!exp || exp>Date.now()){
            res.json({
                login: false
            })
        }
        console.log(exp)
        res.json({
            access_token
        })
    }
    if(req.method==='POST'){
        const login = req.query.login
        const password = req.query.password
        const User = await PrismaClient.user.findFirst({
            where:{
                login:login as string,
            }
        })
        const passwordRight = await checkPasswordHash(password as string, User?.password as string)
        if(passwordRight){
            const access_token =  jwt.sign({login:User?.login as string}, process.env.JWT_SECRET as string,{
                expiresIn: 36000
            })
            setCookie('access_token', access_token, {
                expires: new Date(Date.now() + 36000),
                httpOnly:true
            })
            res.json({
                'login': true
            })
        }
        
    }
}