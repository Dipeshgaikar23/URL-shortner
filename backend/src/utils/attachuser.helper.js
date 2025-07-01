import { findeUserById } from "../dao/user.dao.js"
import { verifyToken } from "./helper.js"

export const attachUser = async (req, res, next) =>{
    const token = req.cookies.token
    if(!token) return next()
    
    try{
        const decoded = verifyToken(token)
        const user = await findeUserById(decoded)
        if(!user) return next()
        req.user = user
        next()
    }catch(err){
        next()
    }
}