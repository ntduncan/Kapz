const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");

const productRoutes = require("./routes/productRoutes");
const loginRoutes = require("./routes/loginRoutes");

//Connect to MongoDB
const username = process.env.KAPZUSERNAME;
const password = process.env.KAPZPASSWORD;
const MONGODB_URI = `mongodb+srv://${username}:${password}@cluster0.vctnn.mongodb.net/cluster0`;
const mongoCon = process.env.mongoCon || MONGODB_URI;

const app = express();
const store = new MongoDBStore({
  //USED TO STORE SESSION IN MONGODB
  uri: MONGODB_URI,
  clecction: "sessions",
});

mongoose
  .connect(mongoCon, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const csrfProtection = csrf();
let urlencodedParser = bodyParser.urlencoded({ extended: false });

const corsOptions = {
  origin: "https://kapz.herokuapp.com/",
  optionsSuccessStatus: 200,
};
app
  .use(cors(corsOptions))
  .use(
    session({
      secret: "my secret",
      resave: false,
      saveUninitialized: false,
      store: store,
    })
  )
  .use(csrfProtection) //Saves csrf token


app
  .use(express.static(__dirname + "/public")) //static files
  .set("view engine", "ejs");

const PORT = process.env.PORT || 5000;

app
.use((req, res, next) => {
    //USED FOR EVERY PAGE
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
  })
  .get("/", (req, res, next) => {
    res.render("index");
  })
  .use("/products", productRoutes)
  .use("/login", loginRoutes);

app.listen(PORT, () => {
  console.log("Server connected at:", PORT);
});
