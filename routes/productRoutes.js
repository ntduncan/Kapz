const express = require("express");
const router = express.Router();
const Product = require("../models/Product")
const productController = require("../controllers/productController");
const bodyParser = require('body-parser')
const isAuth = require('../middleware/is-auth');

let urlencodedParser = bodyParser.urlencoded({extended: false})


router.get('/', (req, res, next) => {
    productController.getProductsFromDB()
     .then(products => res.render('productList', {
         products: products, 
         auth: req.session.isLoggedIn,
        }))
     .catch(err => {console.log(err)})
})

router.get('/new-product', isAuth, (req, res, next) => {
        res.render('addProduct');
})

router.post('/add-product', isAuth, urlencodedParser, (req, res, next) => {

    const data = req.body;
    
    const product = new Product({
        title: data.title,
        price: data.price, 
        quantity: data.quantity, 
        description: data.description,
        img: data.img, 
    });
    productController.addProductToDB(product);
    
    res.redirect('/products');
})

router.delete('/:id', isAuth, (req, res, next) => {
    
    const id = req.params.id;
    Product.findByIdAndDelete(id)
    .then(() => res.json({redirect: "/products"}))
    .catch(err => {console.log(err)})

})

router.post('/:id', isAuth, urlencodedParser, (req, res, next) => {
    if(req.session.isLoggedIn){
    const id = req.params.id;
    const data = req.body;
    const product = {
        title: data.title,
        price: data.price, 
        quantity: data.quantity, 
        description: data.description,
        img: data.img, 
    };
    
    Product.findByIdAndUpdate(id, product)
    .then(() => res.redirect(`/products/${id}`))
    .catch(err => {console.log(err)})
    } else {
        res.redirect('/products');
    }
    
})

router.get('/:id', (req, res, next) => {
    Product.findById(req.params.id)
     .then(product => {
         res.render('productDetail', {product: product, auth: req.session.isLoggedIn})
    })
    .catch(err => {
        if(err.statusCode === 404){
            res.send(err)
        } else {
            console.log(err)
        }
    })
})


module.exports = router;