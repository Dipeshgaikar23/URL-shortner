import { generateNanoId, normalizeUrl } from "../utils/helper.js"
import { saveShortUrl } from "../dao/shorturl.js"

export const createShortUrlWithoutUser = async (url)=>{
    const shortUrl = generateNanoId(7)
    let normalizedUrl = normalizeUrl(url)
    await saveShortUrl(shortUrl, normalizedUrl)
    return shortUrl
}

export const createShortUrlWithUser = async (url, userId)=>{
    const shortUrl = generateNanoId(7)
    let normalizedUrl = normalizeUrl(url)
    await saveShortUrl(shortUrl, normalizedUrl, userId)
    return shortUrl
}