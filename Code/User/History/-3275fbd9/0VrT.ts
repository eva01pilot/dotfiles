import bcrypt from 'bcrypt'

const generatePasswordHash = async(saltRounds: number, password: string ) =>{
    const salt = await bcrypt.genSalt(saltRounds)
    const hashed = await bcrypt.hash(password, salt)
    console.log(salt,password)
    return hashed 

}
export default generatePasswordHash