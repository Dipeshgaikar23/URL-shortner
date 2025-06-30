import axios from "axios"
import axiosInstance from "../utils/axios"

export const createShortUrl = async (url) =>{
    const {data} = await axiosInstance.post('/api/create', { url })
    return data.shortUrl
}