import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // Removed unique: true to allow multiple users with the same name
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
});

userschema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userschema.set('toJSON', {
    transform: function(doc, ret){
        delete ret.password;
        delete ret.__v;
        return ret;
    }
})

userschema.pre('save', async function(next) {
    if (!this.isModified("password")) return next()
    // console.log(this, password)
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// Add error handling middleware for duplicate key errors
userschema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        next(new Error(`A user with this ${field} already exists`));
    } else {
        next(error);
    }
});

const User = mongoose.model('User', userschema);

export default User;