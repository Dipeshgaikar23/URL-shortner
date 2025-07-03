import { findeUserById } from "../dao/user.dao.js"
import { verifyToken } from "../utils/helper.js"

export const authMiddleware = async (req, res, next) =>{
    const token = req.cookies.token
    // console.log(token)
    if(!token) return res.status(401).json({message: "Unathorized"})
    
    try{
        const decoded = verifyToken(token)
        const user = await findeUserById(decoded)
        // console.log(user)
        if(!user) return res.status(401).json({message: "Unathorized"})
        req.user = user
        next()

    }catch(err){
        return res.status(401).json({message: "Unathorized"})  
    }
}