const express = require("express");
const router = express.Router();
const Product = require("../models/Product")
const bodyParser = require('body-parser')

let urlencodedParser = bodyParser.urlencoded({extended: false})

let products = [
    new Product("The Tic Tac", 119.00, 10, "https://images.unsplash.com/photo-1553680528-62abdfec6544?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"),
    new Product("The Black Swan", 89.00, 5, "https://images.unsplash.com/photo-1589578228447-e1a4e481c6c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80"),
    new Product("The Area-51", 99.00, 11, "https://images.unsplash.com/photo-1626958390943-a70309376444?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjAwfHxrZXlib2FyZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"),
    new Product("The Chill Hop", 299.00, 3, "https://images.unsplash.com/photo-1543966888-7c1dc482a810?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"),
    new Product("The Low Key", 89.00, 5, "https://thegadgetflow.com/wp-content/uploads/2021/09/Keychron-Q1-mechanical-keyboard-featured.jpg"),
    new Product("The Kapz OG", 199.00, 9, "https://i.etsystatic.com/24032430/r/il/06fe59/2522622687/il_fullxfull.2522622687_hjdl.jpg"),
]

router.get('/', (req, res) => {
    res.render('productList', {products: products});
})

router.get('/new-product', (req, res) => {
    res.render('addProduct');
})

router.post('/add-product', urlencodedParser, (req, res) => {
    const data = req.body;
    const product = new Product(data.title, data.price, data.quantity, data.img);
    products.push(product);
    res.redirect('/products');
})

module.exports = router;