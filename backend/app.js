import express from 'express'
import dotenv from 'dotenv'
import connectDB from './src/config/mongodb.config.js'
import createUrlRoute from './src/routes/url.route.js'
import authRoute from './src/routes/auth.route.js'
import { redirectFromShortUrl } from './src/controllers/shorturl.controller.js'
import errorHandler from './src/utils/errorhandler.js'
import cors from 'cors'

const app = express()
dotenv.config("./.env")


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(errorHandler)

app.use('/api/create', createUrlRoute)
app.use('/api/auth', authRoute)

app.get('/:id', redirectFromShortUrl)

app.listen(3000, ()=>{
    connectDB()
    console.log("app is listening on port 3000");
})