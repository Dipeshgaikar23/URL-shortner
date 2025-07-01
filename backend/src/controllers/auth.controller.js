import { cookieOptions } from "../config/config.js";
import { loginUser, registerUser } from "../services/auth.service.js";

export const register = async (req, res) =>{
    const {name, email, password} = req.body;
    const {token, newUser} = await registerUser(name, email, password)

    res.cookie("token", token, cookieOptions)
    res.status(200).json({message: "register success"})
}

export const login = async (req, res) =>{
    const {email, password} = req.body
    const {token, user} = await loginUser(email, password)

    res.cookie('token', token, cookieOptions)
    res.status(200).json({message: "Login success"})
}