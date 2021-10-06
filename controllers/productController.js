const Product = require('../models/Product');
const fs = require('fs')

const getProductsFromDB = () => {
    // let rawData = fs.readFileSync('./models/products.json');
    // let products = JSON.parse(rawData); //Use js to read json objects in 
    const products = Product.find()
    .then(results => {return results})
    
    return products
    
}

const addProductToDB = (product) => {
    product.save()
    .catch(err => console.log(err));
}

module.exports = {
    getProductsFromDB,
    addProductToDB,
}