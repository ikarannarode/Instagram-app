import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Required fields cannot be empty!",
                success: false,
            })
        };
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exists!",
                success: false,
            })
        }
        const hashedPassword = bcrypt.hashSync(password, 10)
        await User.create({
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User Signup Successfully",
            success: false
        })

    } catch (error) {
        console.log(error);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "Required fields cannot be empty!",
                success: false,
            })
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        const isPasswordMatched = bcrypt.compareSync(password, user.password);
        if (!isPasswordMatched) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
        //populate each post in the post Array


        const populatedPosts = await Promise.all(
            user.posts.map(async (postId) => {
                const post = await Post.findById(postId);
                if (post.author.equals(user._id)) {
                    return post;
                }
                return null;
            })
        );

        user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            posts: populatedPosts
        }



        return res.status(200).cookie("token", token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000, secure: true }).json({
            message: `Welcome back ${user.username}`,
            success: true,
            user
        })

    } catch (error) {
        console.log(error);
    }
};


export const logout = async (req, res) => {
    try {
        return res.cookie("token", null, { httpOnly: true, maxAge: 0, secure: true }).json({
            message: "Logged out successfully.",
            success: true

        })

    } catch (error) {
        console.log('Error while logout:', error);
    }
}

export const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        let user = await User.findById(userId).select("-password");
        return res.status(200).json({
            user,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const editProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { bio, gender } = req.body;
        const profilePicture = req.file;
        let cloudResponse;

        if (profilePicture) {
            const fileUri = getDataUri(profilePicture);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
        }
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }
        if (bio) user.bio = bio;
        if (gender) user.gender = gender;
        if (profilePicture) user.profilePicture = cloudResponse.secure_url;
        await user.save();

        return res.status(200).json({
            message: "Profile updated",
            success: true,
            user
        })

    } catch (error) {
        console.log(error);
    }
}


export const getSuggestedUsers = async (req, res) => {
    try {
        const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select("-password");
        if (!suggestedUsers) {
            return res.status(400).json({
                message: "Currently do not have any users",
            })

        };
        return res.status(200).json({
            success: false,
            users: suggestedUsers
        })
    } catch (error) {
        console.log(error);
    }
}

export const followOrUnfollow = async (req, res) => {
    try {
        const follower = req.id;
        const following = req.params.id;
        if (following === follower) {
            return res.status(400).json({
                message: "Something went wrong"
            })

        }
        const user = await User.findById(follower);
        const targetUser = await User.findById(following);
        if (!user || !targetUser) {
            return res.status(400).json({
                message: "User not found!",
                success: false
            });
        }
        // Now I will check I have to follow or not

        const isFollowing = user.following.includes(following)

        if (isFollowing) {
            // Unfollow logic
            await Promise.all([
                User.updateOne({ _id: follower }, { $pull: { following: following } }),
                User.updateOne({ _id: following }, { $pull: { followers: follower } })

            ]);
            return res.status(200).json({
                message: "Unfollowed successfully",
                success: true
            });
        }
        else {
            // Follow logic
            await Promise.all([
                User.updateOne({ _id: follower }, { $push: { following: following } }),
                User.updateOne({ _id: following }, { $push: { followers: follower } })

            ]);
            return res.status(200).json({
                message: "Followed successfully",
                success: true
            });
        }
    } catch (error) {
        console.log(error);
    }
}