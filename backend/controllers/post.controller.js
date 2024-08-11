import { User } from "../models/user.model.js";
import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
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
            .populate({
                path: "author",
                select: "username, profilePicture"
            })
            .populate({
                path: "comments",
                sort: { createdAt: -1 },
                populate: {
                    path: 'author',
                    select: 'username,profilePicture'
                }
            });
        return res.status(200).json({
            posts,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const likePost = async (req, res) => {
    try {
        const userWillLikeId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false
            })
        }


        await post.updateOne({ $addToSet: { likes: userWillLikeId } })
        await post.save();
        return res.status(200).json({
            message: "Post Liked",
            success: true
        })


    } catch (error) {
        console.log(error);
    }
}


export const dislikePost = async (req, res) => {
    try {
        const userWillLikeId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false
            })
        }


        await post.updateOne({ $pull: { likes: userWillLikeId } });
        await post.save();
        return res.status(200).json({
            message: "Post Disliked",
            success: true
        })


    } catch (error) {
        console.log(error);
    }
}

export const addComment = async (req, res) => {
    try {
        const postId = req.params.id;
        const UserWhowillComment = req.id;
        const { text } = req.body;
        const post = await Post.findById(postId);
        if (!text) return res.status(400).json({
            message: "Comment field cannot be empty",
            success: false
        });
        const comment = await Comment.create({
            text,
            author: UserWhowillComment,
            post: postId
        }).populate({
            path: 'author',
            select: "username,profilePicture"
        });
        post.comments.push(comment._id);
        await post.save();
        return res.status(201).json({
            message: "Comment Added",
            comment,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}




export const getCommentsOfPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const comments = await Comment.find({ post: postId }).populate('author', 'username , profilePicture');
        if (!comments) {
            return res.status(404).json({
                message: "No comments found for this post",
                success: false
            })
        }
        return res.status(200).json({ success: true, comments })

    } catch (error) {
        console.log(error);
    }
}


export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false
            });

        }
        if (post.author.toString() !== authorId) return res.status(403).json({ message: "Unauthorized" });
        await Post.findByIdAndDelete(postId);
        let user = await User.findById(authorId);
        user.posts = user.posts.filter(id => id.toString() !== postId);
        await user.save();
        await Comment.deleteMany({ post: postId });
        return res.status(200).json({ success: true, message: "Post deleted" });
    } catch (error) {
        console.log(error);
    }
}
export const bookMarkPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(findById);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false
            })
        }
        const user = await User.findById(authorId);
        if (user.bookmarks.includes(post._id)) {
            // already bookmarked -> remove from the bookmarks
            await user.updateOne({ $pull: { bookmarks: post._id } });
            await user.save();
            return res.status(200).json({
                success: true,
                type: "Unssaved",
                message: "Post removed from bookmark"
            })
        }
        else {
            // I have to bookmark
            await user.updateOne({ $addToSet: { bookmarks: post._id } });
            await user.save();
            return res.status(200).json({
                success: true,
                type: "Saved",
                message: "Post added to bookmark"
            })
        }


    } catch (error) {
        console.log(error);
    }
}


