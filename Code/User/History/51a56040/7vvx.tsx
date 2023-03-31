'use client'
import axios from 'axios'
import React from 'react'
import '../../styles/globals.css'
const Page =  (props:any) => { 
  const fetchData = async() =>{
    axios.defaults.withCredentials = true
    await axios.get('http://localhost:3000/api/user/auth')
    await axios.get('http://localhost:3000/api/tshirt/image')
  }

  return (
    <button onClick={fetchData}>fetch</button>
  )
}


export default Page