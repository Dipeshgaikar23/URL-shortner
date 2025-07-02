import { createUser, findeUserByEmail, findeUserByEmailAndPassword } from '../dao/user.dao.js'
import { signToken } from '../utils/helper.js'

export const registerUser = async (name, email, password)=>{
    const user = await findeUserByEmail(email)
    if (user) throw new Error("User already exist")
    
    const newUser = await createUser(name, email, password)
    const token = signToken({id: newUser._id})
    return {token, newUser}
}

export const loginUser = async(email, password)=>{
    const user = await findeUserByEmailAndPassword(email)
    if (!user) throw new Error("Invalid credentials")
    
    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid) throw new Error("Invalid credentials")
    const token = signToken({id: user._id})
    return {token, user}
}