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

        const newUser = new User({ fullName, email, password });
        await newUser.save();

        const accessToken = jwt.sign({ newUser }, process.env.JWT_SECRET, {
            expiresIn: "30m",
        });

        return res.status(200).json({
            error: false,
            newUser,
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

        const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "30m" });

        return res.status(200).json({ error: false, email, accessToken, message: "Login successful" });

    } catch (error) {
        return res.status(500).json(error);
    }
}


module.exports = { createAccount, login };