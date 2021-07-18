const Users = require('../models/userModel');

const AuthAdmin = async (req, res, next) => {
    try {
        const user = await Users.findById({_id: req.user.id})
        console.log(user)
        if(user.role === 0) {
            return res.status(400).json({message: "Access denied"})
        }
        next()
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}
module.exports = AuthAdmin