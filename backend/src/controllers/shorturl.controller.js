import { getShortUrl } from "../dao/shorturl.js"
import { createShortUrlWithUser, createShortUrlWithoutUser } from "../services/shorturl.service.js"

export const createShortUrl = async (req, res) => {
    try {
        const { url } = req.body
        const shortUrl = await createShortUrlWithoutUser(url)
        res.send(process.env.APP_URL + shortUrl)
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
    console.log(url)
    res.redirect(url.fullurl)
}