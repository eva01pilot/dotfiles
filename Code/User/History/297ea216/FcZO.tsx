import axios from "axios";
import dynamic from "next/dynamic";
import { redirect } from 'next/navigation';

const CreateScreen = dynamic(() => import("../components/CreateScreen"), {
  ssr: false,
});
const page = async () => {
  const authed = await axios.get('http://localhost:3000/api/user/auth')
  if(authed.data.login===false){
    redirect('/login')
  }
  return (
  <>
  <CreateScreen />
  </>
  
  )
}
export default page;
