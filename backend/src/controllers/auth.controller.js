import { cookieOptions } from "../config/config.js";
import { loginUser, registerUser } from "../services/auth.service.js";

export const register = async (req, res) =>{
    const {name, email, password} = req.body;
    const {token, newUser} = await registerUser(name, email, password)

    req.user = newUser
    res.cookie("token", token, cookieOptions)
    res.status(200).json({message: "register success"})
}

export const login = async (req, res) =>{
    const {email, password} = req.body
    const {token, user} = await loginUser(email, password)

    req.user = user
    // console.log(user)
    // console.log(cookieOptions)
    res.cookie('token', token, cookieOptions)
    res.status(200).json({user:user, message: "Login success"})
}

// export const logout = async (req, res) =>{
//     res.clearCookie("token", cookieOptions)
//     res.status(200).json({message: "Logout success"})
// }

export const getCurrentUser = async (req, res) =>{
    // console.log(req.user)
    res.status(200).json({user: req.user})
}