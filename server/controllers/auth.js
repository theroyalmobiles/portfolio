const User = require('../models/Auth');

exports.signup = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword)
            return res.status(400).json({ message: 'Passwords do not match' });

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: 'Email already exists' });

        const newUser = await User.create({ fullName, email, password });
        res.status(201).json({ message: 'Signup successful ✅', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Signup failed ❌', error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user)
            return res.status(404).json({ message: 'User not found' });

        if (user.password !== password)
            return res.status(401).json({ message: 'Invalid credentials' });

        res.status(200).json({ message: 'Login successful 🚀', user });
    } catch (err) {
        res.status(500).json({ message: 'Login failed ❌', error: err.message });
    }
};

exports.allUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (e) {
        res.status(500).json({ message: "Error fetching users", error: e })
    }
}


exports.admin = async (req, res) => {
    res.status(200).json({
        user: "giri",
        mail: "giri@g.g",
        passwd: "giri"
    })
};


exports.resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ message: "User not found" })
        user.password = password
        await user.save()
        res.status(200).json({ message: "Password reset successful" })
    } catch (err) {
        res.status(500).json({ message: "Reset failed", error: err.message })
    }
}