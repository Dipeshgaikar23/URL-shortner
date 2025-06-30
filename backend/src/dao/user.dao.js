import User from "../models/user.model.js"

export const findeUserByEmail = async (email) => {
    return await User.findOne({ email })
}


export const findeUserById = async (id) => {
    return await User.findById(id)
}


export const createUser = async (name, email, password) => {
    const newUser = new User({ name, email, password })
    await newUser.save()
    return newUser
}
