import axios from "axios";
import { useEffect, useState } from "react";
interface User {
    id: number,
    login: string,
    avatar: string
}
export default async function useUserData(){
    const [user, setUser] = useState<User>()
    useEffect(()=>{
        (async()=>{
            const user = await axios.get('/api/user/auth')
            setUser(user.data)
        })();
    })
}