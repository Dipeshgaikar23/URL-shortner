import { nanoid } from 'nanoid'
import { cookieOptions, jwtOptions } from '../config/config.js';
import jwt from 'jsonwebtoken';

export const generateNanoId = (length) => {
    return nanoid(length)
}

export const normalizeUrl = (inputUrl) => {
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
        return 'https://' + inputUrl;
    }
    return inputUrl;
}

export const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_KEY, jwtOptions)
}

export const verifyToken = (token) =>{
    const decoded =  jwt.verify(token, process.env.JWT_KEY)
    return decoded.id
}
