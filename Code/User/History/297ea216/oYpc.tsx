'use client'
import axios from "axios";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const CreateScreen = dynamic(() => import("../components/CreateScreen"), {
  ssr: false,
});
const page = () => {
  const router = useRouter()
  const isAuthed = useState(false)
  useEffect(()=>{
    (async()=>{
      const authed = await axios.get('http://localhost:3000/api/user/auth',{withCredentials:true})
      if(authed.data.login===false){
        router.push('/login?back=createImage')
      }
    })();
  },[])
  
  if(isAuthed) return (
  <>
    <CreateScreen />
  </> 
  )
  else return (
    <h1>Loading</h1>
  )
}
export default page;
