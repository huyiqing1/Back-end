const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8000;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');
const saltRounds = 10;

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
    bookimg: String
});

const books = new Schema({
    id: Number,
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

const customers = new Schema({
    customer_id: Number,
    first_name: String,
    last_name: String,
    middle_name: String,
    email: String,
    password: String,
    phone_number: String,
    shipping_address: String,
    shipping_postal_code: String,
    billing_address: String,
    billing_postal_code: String
})

const Orders = mongoose.model("Orders", orders);
const Books = mongoose.model("Books", books);
const Customers = mongoose.model("Customers", customers);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.json());

app.listen(HTTP_PORT, () => {
    console.log("Start the server");
});

//get all books
app.get("/books", (req, res) => {
    Books.find({})
        .exec()
        .then((bookData) => {
            res.send(bookData);
        });
});

//get book by book isbn
app.get("/book/:id", (req, res) => {
    let id = req.params.id;
    Books.find({ id: id })
        .exec()
        .then((bookData) => {
            res.send(bookData);
        });
});

//get all customers
app.get("/customers", (req, res) => {
    Customers.find({})
        .exec()
        .then((customerData) => {
            res.send(customerData);
        });
});

//get all orders
app.get("/orders", (req, res) => {
    Orders.find({})
        .exec()
        .then((orderData) => {
            res.send(orderData);
        });
});

//get order by order id
app.get("/order/:id", (req, res) => {
    let id = req.params.id;
    Orders.findOne({ order_id: id })
        .exec()
        .then((orderData) => {
            res.send(orderData);
        });
});

//get orders by customer id
app.get("/orders/customerid/:id", (req, res) => {
    let id = req.params.id;
    Orders.find({ customer_id: id })
        .exec()
        .then((orderData) => {
            res.send(orderData);
        });
});

//get orders by order id
app.get("/orders/orderid/:id", (req, res) => {
    let id = req.params.id;
    Orders.find({ order_id: id })
        .exec()
        .then((orderData) => {
            res.send(orderData);
        });
});

//user login
app.post("/login", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    Customers.find({
        email: email
    })
        .exec()
        .then((customerData) => {
            if (customerData.length == 0) {
                res.send(false);
            }
            else if (bcrypt.compareSync(password, customerData[0].password)) {
                res.send(customerData);
            } else {
                res.send(false);
            }
        });
});

//user register
app.post("/register", (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newCustomer = new Customers({
        email: email,
        password: hashedPassword
    })

    Customers.find({
        email: email
    })
        .exec()
        .then((customerData) => {
            if (customerData.length == 1) {
                res.send(false)
            } else {
                newCustomer.save((err) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(true);
                    }
                });
            }
        });
});