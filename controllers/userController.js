const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            const user = await Users.findOne({ email });

            if (user)
                return res.status(401).json({ message: "Email already registered." })
            if (password.length < 8)
                return res.status(401).json({ message: "Password to short" })

            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = await Users({
                name, email, password: passwordHash
            });
            await newUser.save();

            const accessToken = createAccessToken({ id: newUser._id });
            const refreshToken = createRefreshToken({ id: newUser._id });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })
            res.status(200).json({ accessToken: accessToken });
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },
    refreshToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshToken;
            if (!rf_token) return res.status(400).json({ message: "Please Login or Register" })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(401).json({ message: "Please Login or Register" })

                const accessToken = createAccessToken({ id: user.id })
                res.json({ user, accessToken });
            })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email });
            if (!user) return res.status(401).json({ message: "Users does not exist." })

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: "Incorrect password." })

            const accessToken = createAccessToken({ id: user._id });
            const refreshToken = createRefreshToken({ id: user._id });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })
            res.status(200).json({ accessToken })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshToken', {
                path: '/user/refresh_token'
            })
            res.status(200).json({ message: "Logged out" })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if (!user) return res.status(400).json({ message: err.message })
            res.json(user)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },

    addCart: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if (!user) return res.status(400).json({ msg: "User does not exist." })
            await Users.findOneAndUpdate({ _id: req.user.id }, {
                cart: req.body.cart
            })
            console.log("cart :", req.body.cart)
            return res.status(200).json({msg: "Added to Cart"})
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },

    
    forgetPassword: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ email });

            if (!user) return res.status(401).json({ message: "Email Not Found" });

            if (password.length < 8) return res.status(401).json({ message: "Password to short" })

            const passwordHash = await bcrypt.hash(password, 10);

            await Users.findOneAndUpdate(
                { email: req.body.email }, { password: passwordHash }
            )

            return res.status(200).json({
                message: "Password Updated."
            })
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '11m' })
};
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
}

module.exports = userCtrl;