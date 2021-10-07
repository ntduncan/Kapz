const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const products = require('./routes/productRoutes')

const app = express();

let urlencodedParser = bodyParser.urlencoded({extended: false})

const corsOptions = {
    origin: "https://kapz.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

//Connect to MongoDB
const username = process.env.KAPZUSERNAME;
const password = process.env.KAPZPASSWORD;
const mongoCon = process.env.mongoCon || `mongodb+srv://${username}:${password}@cluster0.vctnn.mongodb.net/cluster0?retryWrites=true&w=majority`;

mongoose.connect(mongoCon, {useNewUrlParser: true, useUnifiedTopology: true})
 .then(() => {
        console.log("Connected to MongoDB")
    })
 .catch(err => {console.log(err)})
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