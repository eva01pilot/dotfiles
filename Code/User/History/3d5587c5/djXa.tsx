'use client'

import React, { useState } from 'react'
const Signup = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    return (
        <form className='w-full h-[calc(100svh-5rem)] items-center justify-center form-control'>
            <div className="p-12 bg-neutral-content form-control items-center rounded-lg">
                <div className="p-2">
                    <h1 className='text-2xl text-base-100 '>Регистрация</h1>
                </div>
                <div className='flex flex-row p-1'>
                    <input value={login} onChange={(e)=>setLogin(e.currentTarget.value)} placeholder='Введите логин' id="login" className='input input-bordered input-md' />
                </div>
                <div className='flex flex-row p-1'>
                    <input onChange={(e)=>setPassword(e.currentTarget.value)} placeholder='Введите пароль' type="password" id="password" className='input input-bordered input-md' />
                </div>
                <div className='flex flex-row p-1'>
                    <input onChange={(e)=>setRepeatPassword(e.currentTarget.value)}  placeholder='Подтвердите пароль' type="password" id='repeatpassword' className='input input-bordered input-md' />
                </div>
                <div className="p-2 self-end">
                    <button className='btn bg-success border-0 self-end'>Зарегистрироваться</button>
                </div>
            </div>
        </form>
    )
}

export default Signup