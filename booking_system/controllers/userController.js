const User = require("../models/User");

const signup = async (req, res) => {
    try {
        const { username, password, role } = req.body || {};
        console.log("Signup attempt for:", username);

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log("User already exists:", username);
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await User.create({
            username,
            password,
            role: role || "user"
        });

        console.log("Signup successful:", username);
        res.status(201).json({
            message: "Signup successful",
            user: {
                username: newUser.username,
                role: newUser.role
            }
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal Server Error during signup", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body || {};
        console.log("Login attempt for:", username);

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await User.findOne({ username, password });

        if (user) {
            console.log("Login successful:", username);
            res.json({
                message: "Login successful",
                user: {
                    username: user.username,
                    role: user.role
                }
            });
        } else {
            console.log("Invalid credentials for:", username);
            res.status(401).json({ message: "Invalid credentials" });
        }

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error during login", error: error.message });
    }
};

module.exports = {
    signup,
    login
};