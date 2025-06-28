import {nanoid} from 'nanoid'

export const generateNanoId = (length)=>{
    return nanoid(length)
}

export const normalizeUrl = (inputUrl) => {
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
        return 'https://' + inputUrl;
    }
    return inputUrl;
}
