import { generateNanoId, normalizeUrl } from "../utils/helper.js"
import { getCustomShort, saveShortUrl } from "../dao/shorturl.js"

export const createShortUrlWithoutUser = async (url)=>{
    const shortUrl = generateNanoId(7)
    let normalizedUrl = normalizeUrl(url)
    await saveShortUrl(shortUrl, normalizedUrl)
    return shortUrl
}

export const createShortUrlWithUser = async (url, userId, slug=null)=>{
    const shortUrl = slug || generateNanoId(7)
    const exists = await getCustomShort(slug)
    if(exists) throw new Error("This custom URL is already exists")

    let normalizedUrl = normalizeUrl(url)
    await saveShortUrl(shortUrl, normalizedUrl, userId)
    return shortUrl
}