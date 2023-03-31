import axios from "axios";
import dynamic from "next/dynamic";
import PrismaClient from '../../server/db'

const CreateScreen = dynamic(() => import("../components/CreateScreen"), {
  ssr: false,
});
const page = async () => {
  const authed = await axios.get('http://localhost:3000/api/user/auth')
  const data = authed.data
  console.log(data)

  return (
  <>
  <CreateScreen />
  <h1>{ authed && data}</h1>
  </>
  
  )
}
export default page;
