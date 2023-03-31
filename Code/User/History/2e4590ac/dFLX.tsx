'use client'
import axios from "axios"
import { redirect } from "next/navigation"
import { MouseEventHandler, useState } from "react"

const page = () =>{
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const submitForm:MouseEventHandler = (e) => {
        e.preventDefault()
        axios.post('http:localhost:3000/api/user/login', {
            password,
            login,
        }, {
            withCredentials: true
        })

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
            <button onClick={()=>redirect('/signup')}>Зарегистрироваться</button>
        </form>
    )
}
export default page