const Category = require('../models/categoryModel');
const Products = require('../models/productModel');

const categoryCtrl = {
    getCategory: async (req, res) => {
        try {
            const category = await Category.find()
            res.json(category)
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },

    CreateCategory: async (req, res)=>{
        try {
            const {name}=req.body;
            const category = await Category.findOne({name})

            if(category) 
                return req.status(500).json({message: "This Category already exists."})

            const newCategory = new Category({name})

            await newCategory.save();

            res.json({message: "Category is Created"})
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },

    deleteCategory: async(req, res)=>{
        try {
            const products = await Products.findOne({category: req.params.id})
            if(products) return res.status(400).json({
                msg: "Please delete All the Product with this Categories"
            })
            await Category.findByIdAndDelete(req.params.id)

            res.json({message: "Category is deleted"})
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    },
    updateCategory: async(req, res)=>{
        try {
            const {name}=req.body;
            await Category.findByIdAndUpdate({_id: req.params.id}, {name})

            res.json({message: "Category is Update"})
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }
}

module.exports = categoryCtrl