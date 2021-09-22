const express = require('express');
const bodyParser = require('body-parser')

const products = require('./routes/productRoutes')
const app = express();

let urlencodedParser = bodyParser.urlencoded({extended: false})

app
 .use(express.static(__dirname + '/public'))  //static files
 .set('view engine', 'ejs');
const PORT = process.env.PORT || 5000;


app.get("/", (req, res) => {
    res.render('index');
})


app.use("/products", products)

app.listen(PORT, () => {
    console.log('Server connected at:',PORT);
});