'use client'
import axios from 'axios'
import React from 'react'
import '../../styles/globals.css'
const Page =  (props:any) => {
  
  const fetchData = async() =>{
    const res = await axios.get('http://localhost:3000/api/tshirt/image', {
      withCredentials: true
    })
  }

  return (
    <button onClick={fetchData}></button>
  )
}


export default Page