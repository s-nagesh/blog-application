import mongoose, { mongo } from "mongoose";
import BlogModel from "../models/Blog";
import UserModel from "../models/User";

export const getAllBlog = async (req, res) => {
    try {
        let blog = await BlogModel.find();
        if (!blog) {
            return res.status(400).json({ message: "No Blogs Found" })
        }
        return res.status(200).json({ blog })
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const addNewBlog = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;
        let existingUser = await UserModel.findById(user);
        if (!existingUser) {
            return res.status(400).json({ message: "Unable to find user by id" })
        }
        let blogs = new BlogModel({
            title, description, image, user
        });

        // const session = await mongoose.startSession();
        // console.log("sesssion", session);
        // session.startTransaction();
        // console.log("sesssion111", session);
        await blogs.save();
        existingUser.blogs.push(blogs);
        await existingUser.save()
        // await session.commitTransaction();
        return res.status(200).json({ blogs });
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const updateNewBlog = async (req, res) => {
    try {
        const { title, description } = req.body;
        const blogId = req.params.id

        let blogs = await BlogModel.findByIdAndUpdate(blogId, {
            title, description
        });
        if (!blogs) {
            return res.status(400).json({ message: "Unable To Update Blog" })
        }
        return res.status(200).json({ blogs })
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        let blog = await BlogModel.findByIdAndRemove(blogId).populate("user");
        console.log("blog", blog);
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        if (!blog) {
            return res.status(400).json({ message: "Unable to delete" })
        }
        return res.status(200).json({ message: "Successfull  delete" })
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}