import bcrypt from 'bcrypt'

const generatePasswordHash = async(saltRounds: number, password: string ) =>{
    const salt = await bcrypt.genSalt(saltRounds)
    const hashed = bcrypt.hash(password, salt)
    console.log(salt,hashed)
    return hashed 

}
export default generatePasswordHash