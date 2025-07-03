import User from "../models/user.model.js"
import urlSchema from "../models/url.model.js"

export const findeUserByEmail = async (email) => {
    return await User.findOne({ email })
}

export const findeUserByEmailAndPassword = async (email) => {
    return await User.findOne({ email }).select("+password")
}

export const findeUserById = async (id) => {
    return await User.findById(id)
}


export const createUser = async (name, email, password) => {
    const newUser = new User({ name, email, password })
    await newUser.save()
    return newUser
}

export const getAllUserUrlsFromDao = async (id) =>{
    return await urlSchema.find({user: id}).sort({createAt: -1})
}
