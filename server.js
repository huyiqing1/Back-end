const express = require("express");
const app = express();
const path = require("path");
const HTTP_PORT = process.env.PORT || 8080;

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

const Order = mongoose.model("Orders", orders);

app.listen(HTTP_PORT, () => {
    console.log("Start the server");
});

app.get("/test/:id", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    let id = req.params.id;
    Order.find({ customer_id: id })
        .exec()
        .then((orderData) => {
            res.send(orderData);
        });
});

app.get("/orders/customerid/:id", (req, res) => {
    let id = req.params.id;
    Order.find({ customer_id: id })
        .exec()
        .then((orderData) => {
            res.send(orderData);
        });
});