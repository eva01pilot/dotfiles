import React from 'react'

const Signup = () => {
    return (
        <form className='w-full h-[calc(100svh-5rem)] items-center justify-center form-control'>
            <div className="p-12 bg-neutral-content form-control items-center rounded-lg">
                <div className="p-2">
                    <h1 className='text-2xl text-base-100 '>Регистрация</h1>
                </div>
                <div className='flex flex-row p-1'>
                    <input placeholder='Введите логин' id="login" className='input input-bordered input-md' />
                </div>
                <div className='flex flex-row p-1'>
                    <input placeholder='Введите пароль' type="password" id="password" className='input input-bordered input-md' />
                </div>
                <div className='flex flex-row p-1'>
                    <input placeholder='Подтвердите пароль' type="password" id='repeatpassword' className='input input-bordered input-md' />
                </div>
                <div className="p-2">
                    <button className='btn bg-success btn-wide border-0'>Зарегистрироваться</button>
                </div>
            </div>
        </form>
    )
}

export default Signup