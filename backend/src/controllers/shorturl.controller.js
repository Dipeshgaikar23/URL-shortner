import { getShortUrl } from "../dao/shorturl.js"
import { createShortUrlWithUser, createShortUrlWithoutUser } from "../services/shorturl.service.js"

export const createShortUrl = async (req, res) => {
    try {
        const { url, slug } = req.body
        let shortUrl
        
        if(req.user && slug){
            shortUrl = await createShortUrlWithUser(url, req.user._id, slug)
        }else if(req.user){
            shortUrl = await createShortUrlWithUser(url, req.user._id)
        }
        else{
            shortUrl = await createShortUrlWithoutUser(url)
        }
        
        res.status(201).json({shortUrl: process.env.APP_URL + shortUrl})
    } catch (err) {
        next(err)
    }
}

export const createCustomShortUrl = async () =>{
    try {
        const { url, slug } = req.body
        const shortUrl = await createShortUrlWithUser(url, slug)        

        res.status(201).json({shortUrl: process.env.APP_URL + shortUrl})
    } catch (err) {
        next(err)
    }
}

export const redirectFromShortUrl = async (req, res) => {
    const { id } = req.params
    const url = await getShortUrl(id)
    if (!url) {
        return res.status(404).send("URL not found")
    }
    url.clicks += 1
    await url.save()
    res.redirect(url.fullurl)
}