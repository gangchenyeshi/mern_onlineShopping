const Users = require('../models/userModel');

const userCtrl = {
    register: async (req, res) => {
        try{
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }
};

module.exports = userCtrl;