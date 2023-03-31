import { Request, Response } from "express";
import checkPasswordHash from "../../../helpers/checkPasswordHash";
import PrismaClient from '../../../server/db'
import jwt from 'jsonwebtoken'
import { getCookies, setCookie } from "cookies-next";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse){
    if(req.method==='GET'){
        const cookie = getCookies()
        const access_token = cookie['access_token']
        const exp = cookie['expires_in']
        if(!exp || +exp>Date.now()){
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
            res.setHeader("Access-Control-Allow-Credentials", 'true')
            res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
            return res.json({
                'login': true
            })
        }
        
    }
}