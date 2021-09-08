const Products = require('../models/productModel');


//Filter, Sorting & Pagination
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
        const queryObj = { ...this.queryString}
        console.log({before: queryObj})

        const excludedFields = ["page", "sort", "limit"]
        excludedFields.forEach(el => delete(queryObj[el]))
        console.log({after: queryObj})

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace
                   (/\b(gte|gt|lt|lte|regex)\b/g, match => '$' +match)
        console.log({queryStr: queryStr})

        this.query.find(JSON.parse(queryStr))

        return this;
    }
    sorting(){
        if(this.queryString.sorting) {
            const sortBy = this.queryString.sorting.split(',').join(' ')
            console.log(sortBy)

            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }
        
        return this;
    }
    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.page * 1 || 5
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
    
        return this;
    }
}
const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures (Products.find(), 
                             req.query).filtering().sorting().paginating()
            console.log("filtering :", req.query)
            const products = await features.query;

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