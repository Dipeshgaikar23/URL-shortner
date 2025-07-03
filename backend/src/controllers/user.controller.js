import { getAllUserUrlsFromDao } from "../dao/user.dao.js";

export const getAllUserUrls = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const urls = await getAllUserUrlsFromDao(_id);
        res.status(200).json({ urls });
    } catch (error) {
        next(error);
    }
}