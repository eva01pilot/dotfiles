import axios from 'axios'
import React from 'react'
import '../../styles/globals.css'
const Page = async (props:any) => {
  const res = await axios.get('http://localhost:3000/api/tshirt/image')
  const tshirt = res.data
  return (
    <div>{JSON.stringify(tshirt)}</div>
  )
}


export default Page