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
        const user = await User.findById(autherid);

        if (user) {
            user.post.push(post._id);
            await user.save();
        }
        await post.populate({ path: 'author', select: "-password" });
        return res.staus(201).json({
            message: "New post added",
            post,
            success: true,
        })



    } catch (error) {
        console.log(error)
    }
}


export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'username, profilePicture' })
            .populate({ path: 'comments ', sort: { createdAt: -1 }, populate: { path: "author", select: "username, profilePicture" } })
        return res.status(201).json({
            posts,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const getUserPost = async (req, res) => {
    try {
        const authorId = req.id;
        const posts = await Post.find({ author: authorId }).sort({ createdAt: -1 })



    } catch (error) {
        console.log(error);
    }
}