import bcrypt from 'bcrypt'

const generatePasswordHash = async(saltRounds: number, password: string ) =>{
    const salt = await bcrypt.genSalt(saltRounds)
    const hashed = bcrypt.hash(password, salt)
    return hashed 

}
export default generatePasswordHash