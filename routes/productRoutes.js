const express = require("express");
const router = express.Router();
const Product = require("../models/Product")
const bodyParser = require('body-parser')
const fs = require('fs')

let urlencodedParser = bodyParser.urlencoded({extended: false})

let rawData = fs.readFileSync('./models/products.json');
let products = JSON.parse(rawData); //Use js to read json objects in 

router.get('/', (req, res, next) => {
    res.render('productList', {products: products});
})

router.get('/new-product', (req, res, next) => {
    res.render('addProduct');
})


router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    let product = products.filter(product => product.id == id);

    if(product.length === 1){
        res.render('productDetail', {product: product[0]})
    } else {
        res.redirect('404')
    }
})

router.post('/add-product', urlencodedParser, (req, res, next) => {
    const data = req.body;
    const product = {
        id: products.length,
        title: data.title,
        price: data.price, 
        quantity: data.quantity, 
        img: data.img, 
        description: data.description
    };

    products.push(product);
    fs.writeFileSync('./models/products.json', JSON.stringify(products));

    res.redirect('/products');
})


module.exports = router;