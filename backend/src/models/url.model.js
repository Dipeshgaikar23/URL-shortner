import mongoose from "mongoose";

const urlschema = new mongoose.Schema({
    fullurl: {
        type: String,
        required: true,
    },
    shorturl: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    clicks: {
        type: Number,
        default: 0,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
    }
});

const urlSchema = mongoose.model('urlSchema', urlschema);

export default urlSchema;