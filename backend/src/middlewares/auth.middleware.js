import { findeUserById } from "../dao/user.dao.js"
import { verifyToken } from "../utils/helper.js"

export const authMiddleware = async (req, res) =>{
    const token = req.cookies.token
    if(!token) return res.status(401).json({messege: "Unathorized"})
    
    try{
        const decoded = verifyToken(token)
        const user = await findeUserById(decoded)
        if(!user) return res.status(401).json({messege: "Unathorized"})
        req.user = user
        next()

    }catch(err){
        return res.status(401).json({messege: "Unathorized"})  
    }
}