import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './src/config/mongodb.config.js'
import createUrlRoute from './src/routes/url.route.js'
import userRoute from './src/routes/user.route.js'
import authRoute from './src/routes/auth.route.js'
import { redirectFromShortUrl } from './src/controllers/shorturl.controller.js'
import errorHandler from './src/utils/errorhandler.js'
import cors from 'cors'
import { attachUser } from './src/utils/attachuser.helper.js'


const app = express()
dotenv.config({ path: './.env' }); 


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cors({
  origin: 'https://url-shortner-frontend-6yrb.onrender.com', // ✅ Your actual frontend Render domain
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use(attachUser)
app.use('/api/create', createUrlRoute)
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

app.get('/:id', redirectFromShortUrl)

app.use(errorHandler)

app.listen(3000, ()=>{
    connectDB()
    console.log("app is listening on port 3000");
})
