'use client'
import axios from "axios"
import { MouseEventHandler, useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import Link from "next/link"
const page = () =>{
    const router = useRouter()
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    
    const [back, setBack] = useState('')
    useEffect(()=>{
        const search = window.location.search.replace('?back=','')
        setBack(search)
        console.log(search);
        
    }, [])
    const submitForm:MouseEventHandler = async(e) => {
        e.preventDefault()
        const res = await axios.post('http://localhost:3000/api/user/auth', {
            password,
            login,
        }, {
            withCredentials: true
        })
        if(res.data.login===true){

            console.log(back)
            if(!back){
                router.push('/')
            }
            router.push('/' + back as string)
        }

    }
    return (
        <form className="flex justify-center items-center flex-col w-full h-[calc(100svh-5rem)]">
            <h1 className="font-sans text-2xl p-8">Войдите в аккаунт</h1>
            <div className="flex flex-row">
                <label htmlFor="login">Введите логин</label>
                <input id="login" value={login} onInput={(e)=>setLogin(e.currentTarget.value)}/>
            </div>
            <div className="flex flex-row">
                <label htmlFor="password">Введите пароль</label>
                <input id="password" onInput={(e)=>setPassword(e.currentTarget.value)} value={password}/>
            </div>
            <button onClick={submitForm}>Войти</button>
            <button>
                <Link href={`/signup?back=${back}`}>
                     Зарегистрироваться
                </Link>
            </button>
        </form>
    )
}
export default page