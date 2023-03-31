'use client'
import { useState } from "react"

const page = () =>{
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    return (
        <form>
            <div className="flex flex-row">
                <label htmlFor="login">Введите логин</label>
                <input id="login" value={login} onInput={(e)=>setLogin(e.currentTarget.value)}/>
            </div>
            <div className="flex flex-row">
                <label htmlFor="password">Введите пароль</label>
                <input id="password" onInput={(e)=>setLogin(e.currentTarget.value)} value={password}/>
            </div>
        </form>
    )
}
export default page