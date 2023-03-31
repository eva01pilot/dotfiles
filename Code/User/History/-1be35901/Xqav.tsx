'use client'
import axios from 'axios'
import React from 'react'
import '../../styles/globals.css'
const Page =  (props:any) => { 

  return (
    <>
      <main className='w-full flex flex-col items-center justify-center h-[calc(100svh-5rem)]'>
        <div className='w-4/5 h-full'>
          <div className="mt-10">
            <h1 className='text-6xl'>Коллекция</h1>
          </div>
        </div>
      </main>
    </>
  )
}


export default Page