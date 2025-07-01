import urlSchema from "../models/url.model.js"
export const saveShortUrl = async (shortUrl, longUrl, userId) =>{
    const newUrl = new urlSchema({
        fullurl: longUrl,
        shorturl: shortUrl,
    })
    if(userId){
        newUrl.user = userId
    }
    newUrl.save()

}

export const getShortUrl = async (shortUrl) =>{
    return await urlSchema.findOne({shorturl: shortUrl})
}

export const getCustomShort = async (slug) =>{
    return await urlSchema.findOne({shorturl: slug})
}

