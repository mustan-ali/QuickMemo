const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");


const createAccount = async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName) {
        return res
            .status(400)
            .json({ error: true, message: "Full name is required" });
    }

    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required" });
    }

    if (!password) {
        return res.status(400).json({ error: true, message: "Password is required" });
    }

    try {
        const alreadyExists = await User.findOne({ email: email });
        if (alreadyExists) {
            return res.status(400).json({ error: true, message: "User with this email already exists" });
        }

        const user = new User({ fullName, email, password });
        await user.save();

        const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        return res.status(200).json({
            error: false,
            user,
            accessToken,
            message: "User created successfully",
        });
    } catch (error) {
        return res.status(500).json(error);
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ error: true, message: "Email is required" });
    }

    if (!password) {
        return res.status(400).json({ error: true, message: "Password is required" });
    }

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ error: true, message: "User not found" });
        }

        if (user.password !== password) {
            return res.status(400).json({ error: true, message: "Password is incorrect" });
        }

        const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1d" });

        return res.status(200).json({ error: false, email, accessToken, message: "Login successful" });

    } catch (error) {
        return res.status(500).json(error);
    }
}


const getUser = async (req, res) => {
    const { user } = req.user;

    const isUser = await User.findOne({ _id: user._id });

    if (!isUser) {
        return res.status(400).json({ error: true, message: "User not found" });
    }

    return res.status(200).json({ user: { fullName: isUser.fullName, email: isUser.email, _id: isUser._id, createdOn: isUser.createdOn } });
}


module.exports = { createAccount, login, getUser };