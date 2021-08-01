const express = require('express');
const router = express.Router();

const cloudinary = require("cloudinary");
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.COULD_NAME,
    api_key: process.env.COULD_API_KEY,
    api_secret: process.env.COULD_API_SECRET,
})


router.post("/upload", auth, authAdmin, async (req, res) => {
    try {
        console.log(req.files)

        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).send({ msg: "No Files were uploaded." });

        const file = req.files.file;
        if (file.size > 1024 * 1024) {
            removeTmp(file.tempFilePath)
            return res.status(401).json({ msg: "File size too large, size should be maximum 1MB" });
        }

        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTmp(file.tempFilePath)
            return res.status(401).json({ msg: "File format is incorrect, format should be .jpeg or .png" });
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'shopping' }, async (err, result) => {
            if (err) throw err;
            removeTmp(file.tempFilePath)
            // res.json({ result })
            res.json({ public_id: result.public_id, url: result.url })
        })
        // res.json("test Image upload")
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
});

router.post('/destroy', auth, authAdmin,  (req, res) => {
    try {
        const { public_id } = req.body;

        if (!public_id) return res.status(401).json({ msg: 'No Image selected' })

        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err;
            res.json({ msg: 'Image Deleted' })
        })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
})
const removeTmp = (path => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
})
module.exports = router