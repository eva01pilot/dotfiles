'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { ChangeEvent, MouseEventHandler, useState } from 'react'
const Signup = () => {

    const router = useRouter()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [avatar, setAvatar] = useState('')
    const [errMessage, setErrMessage] = useState('')

    const passwordCheck = password.length > 8
    const correct = password===repeatPassword && password && passwordCheck

    const handleSubmit:MouseEventHandler = async(e) =>{
        e.preventDefault()
        if(!correct) return
        const res = await axios.post('/api/user/signup', {
            login,
            password,
            avatar
        })
        if(res.data.error){
            setErrMessage(res.data.error)
            return
        }
        const search = window.location.search
        const back = search.replace('?back=','')
        if(back){
            router.push('/' + back)
        }
    }

    const uploadFile = async(e: ChangeEvent<HTMLInputElement>) =>{
        const file = Array.from(e.target.files as FileList)[0];
        if(!file) return
        const reader = new FileReader()
        reader.onloadend = () =>{
            setAvatar(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    return (
        <form className='w-full h-[calc(100svh-5rem)] items-center justify-center form-control'>
            <div className="p-12 bg-neutral-content form-control items-center rounded-lg">
                <div className="p-2">
                    <h1 className='text-2xl text-base-100 '>Регистрация</h1>
                </div>
                <div className='flex flex-col p-1 w-full self-end'>
                    <input value={login} onChange={(e)=>setLogin(e.currentTarget.value)} placeholder='Введите логин' id="login" className='input input-bordered input-md' />
                </div>
                <div className='flex flex-col p-1 w-64'>
                    <input value={password} onChange={(e)=>setPassword(e.currentTarget.value)} placeholder='Введите пароль' type="password" id="password" className='input input-bordered input-md' />
                    {!passwordCheck && <p className='text-error break-words'>Пароль должен быть длиннее 8 символов</p>}
                </div>
                <div className='flex flex-col p-1 w-64'>
                    <input value={repeatPassword} onChange={(e)=>setRepeatPassword(e.currentTarget.value)}  placeholder='Подтвердите пароль' type="password" id='repeatpassword' className='input input-bordered input-md' />
                </div>
                <div className='flex flex-col p-1 w-64'>
                    <input onChange={uploadFile} type="file" className="file-input" />
                </div>
                {errMessage && <p>{errMessage}</p>}
                <div className="p-2 self-end">
                    <button onClick={handleSubmit} className={`btn bg-success border-0 self-end ${!correct && 'btn-disabled'}`}>Зарегистрироваться</button>
                </div>
            </div>
        </form>
    )
}

export default Signup