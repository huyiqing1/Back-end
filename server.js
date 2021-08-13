const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8000;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb+srv://clintmacdonald:macdonald12345@cluster0.kn8zs.mongodb.net/Cap805?retryWrites=true&w=majority");

const orders = new Schema({
    order_id: {
        type: Number,
        required: true
    },
    customer_id: Number, //optional column
    shipping_address: String,
    billing_address: String,
    total_price: Number,
    order_email: {
        type: String,
        required: true
    },
    order_date: String,
    order_status: String,
    phone_number: String,
    shipping_id: Number
});

const books = new Schema({
    title: String,
    isbn: String,
    pageCount: Number,
    publishedDate: String,
    thumbnailUrl: String,
    shortDescription: String,
    longDescription: String,
    status: String,
    authors: Array,
    categories: Array,
    price: String,
    stock: Number
});

const Orders = mongoose.model("Orders", orders);
const Books = mongoose.model("Books", books);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

app.listen(HTTP_PORT, () => {
    console.log("Start the server");
});

app.get("/orders/customerid/:id", (req, res) => {
    let id = req.params.id;
    Orders.find({ customer_id: id })
        .exec()
        .then((orderData) => {
            res.send(orderData);
        });
});

app.get("/books", (req,res)=>{
    Books.find({})
    .exec()
    .then((bookData)=>{
        res.send(bookData);
    });
});