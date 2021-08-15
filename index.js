require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileUpload");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
}));
const PORT = process.env.PORT || 5000

//Connection to DB
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err,
        console.log('Connected to DB')
});

//Routing
app.use('/user', require('./router/userRouter'));
app.use('/api', require('./router/categoryRouter'));
app.use('/api', require('./router/uploadRouter'));
app.use('/api', require('./router/productRouter'));

//Listening to Server PORT
app.listen(PORT, () => {
    console.log(`Server is connected at : ${PORT}`)
});