'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../styles/globals.css'
interface Image {
  color: string, 
  created_by_ID: number,
  id: number,
  image_complete64: string,
  image_print64: string,
  prompt: string,
  product_id: string|null
}
const Page =  (props:any) => {
  const [images, setImages] = useState<Image[]>() 
  useEffect(()=>{
    (async()=>{
      const imagesRes = await axios.get('/api/tshirt/image',{
        withCredentials: true
      })
      const images = imagesRes.data.tshirts
      setImages(images)
    })()
  },[])
  return (
    <>
      <main className='w-full flex flex-col items-center justify-center h-[calc(100svh-5rem)]'>
        <div className='w-4/5 h-full'>
          <div className="mt-10">
            <h1 className='text-4xl'>Коллекция</h1>
          </div>
          <div>
            
          </div>
        </div>
      </main>
    </>
  )
}


export default Page