'use client'

import React, { MouseEventHandler, useState } from 'react'
const Signup = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const correct = password===repeatPassword && password

    const passwordCheck = password.length > 8
    const handleSubmit:MouseEventHandler = (e) =>{
        e.preventDefault()
    }
    return (
        <form className='w-full h-[calc(100svh-5rem)] items-center justify-center form-control'>
            <div className="p-12 bg-neutral-content form-control items-center rounded-lg">
                <div className="p-2">
                    <h1 className='text-2xl text-base-100 '>Регистрация</h1>
                </div>
                <div className='flex flex-row p-1'>
                    <input value={login} onChange={(e)=>setLogin(e.currentTarget.value)} placeholder='Введите логин' id="login" className='input input-bordered input-md' />
                </div>
                <div className='flex flex-col p-1'>
                    <input value={password} onChange={(e)=>setPassword(e.currentTarget.value)} placeholder='Введите пароль' type="password" id="password" className='input input-bordered input-md' />
                    {!passwordCheck && <p className='text-error flex whitespace-nowrap'>Пароль должен быть длиннее 8 символов</p>}
                </div>
                <div className='flex flex-row p-1'>
                    <input value={repeatPassword} onChange={(e)=>setRepeatPassword(e.currentTarget.value)}  placeholder='Подтвердите пароль' type="password" id='repeatpassword' className='input input-bordered input-md' />
                </div>
                <div className="p-2 self-end">
                    <button className={`btn bg-success border-0 self-end ${!correct && 'btn-disabled'}`}>Зарегистрироваться</button>
                </div>
            </div>
        </form>
    )
}

export default Signup