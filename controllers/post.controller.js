import { User } from "../models/user.model";
import sharp from "sharp";
import cloudinary from "../utils/cloudinary";
import { Post } from "../models/post.model.js";

export const addNewPost = async (req, res) => {
    try {
        const { caption } = req.body;
        const image = req.file;
        const autherid = req.id;
        if (!image) {
            res.staus(401).json({ message: "image is required!" })
        }

        const optimizedImageBuffer = await sharp(image.buffer)
            .resize({ height: 800, width: 800, fit: 'inside' })
            .toFormat('jpeg', { quality: 80 })
            .toBuffer();

        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            auhter: autherid
        })
        const user = await User.findById(autherid)

    } catch (error) {
        console.log(error)
    }
}