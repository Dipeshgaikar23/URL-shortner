import { cookieOptions } from "../config/config.js";
import { registerUser } from "../services/auth.service.js";

export const register = async (req, res) =>{
    const {name, email, password} = req.body;
    const token = await registerUser(name, email, password)
    res.cookie("token", token, cookieOptions)
    res.status(200).json({message: "Login success"})
}

export const login = async () =>{
    res.send('login')
}