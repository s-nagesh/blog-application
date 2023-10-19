import UserModel from "../models/User";
import bcrypt from "bcryptjs";

export const getAllUser = async (req, res, next) => {
    try {
        let user = await UserModel.find();
        if (user.length > 0) {
            return res.status(200).json({ user })
        }
        return res.status(404).json({ message: "No Users Found" })
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let existingUser = await UserModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists! Login Instead" })
        }
        let hasPassword = bcrypt.hashSync(password)
        let user = new UserModel({
            name, email, password: hasPassword, blogs: []

        });
        await user.save();
        return res.status(200).json({ user })
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let existingUser = await UserModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(400).json({ message: "User Not Found" })
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect Password" })
        }
        return res.status(200).json({ message: "Login Successfull" })
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}