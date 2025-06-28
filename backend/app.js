import express from 'express'
import dotenv from 'dotenv'
import connectDB from './src/config/mongodb.config.js'
import createUrlRoute from './src/routes/url.route.js'
import { redirectFromShortUrl } from './src/controllers/shorturl.controller.js'
import errorHandler from './src/utils/errorhandler.js'

const app = express()
dotenv.config("./.env")


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(errorHandler)

app.use('/api/create', createUrlRoute)

app.get('/:id', redirectFromShortUrl)

app.listen(3000, ()=>{
    connectDB()
    console.log("app is listening on port 3000");
})