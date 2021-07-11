const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: Number,
        default: 0,
    },
    card: {
        type: Array,
        default: []
    },
},
{
    timestamps: true    
}
);

module.exports = mongoose.model('Users', userSchema);