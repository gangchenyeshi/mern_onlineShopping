const Products = require('../models/productModel');

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const products = await Products.find();

            res.status(200).json(products);
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    createProducts: async (req, res) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body;
            if (!images) return res.status(401).json({ msg: 'No Image uploaded.' })

            const products = await Products.findOne({ product_id });
            if (products) return res.status(400).json({ msg: 'This product already exists.' })

            const newProduct = new Products({
                product_id, title: title.toLowerCase(), price, description, content, images, category
            });

            await newProduct.save()
            res.status(200).json(newProduct);
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    updateProducts: async (req, res) => {
        try {
            const { product_id, title, price, description, content, images, category } = req.body;
            if (!images) return res.status(401).json({ msg: 'No image uploaded.' })

            await Products.findOneAndUpdate({ _id: req.params.id }, {
                product_id, title: title.toLowerCase(), price, description, content, images, category
            })
            res.status(200).json({ msg: "Product is Updated" });
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    },
    deleteProducts: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.status(200).json({ msg: "Product is Deleted" })
        } catch (err) {
            return res.status(500).json({ err: err.message })
        }
    }
};

module.exports = productCtrl;