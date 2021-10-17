const express = require('express');
// const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const loginController = require("../controllers/loginController");
const User = require('../models/User');
const bodyParser = require('body-parser')
const isAuth = require('../middleware/is-auth')

let urlencodedParser = bodyParser.urlencoded({extended: false})

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
})

router.get('/logout', isAuth, (req, res, next) => {
    loginController.logout(req, res, next);
})

router.get('/newUser', (req, res) => {
    res.render('newUser')
})

router.post('/validate', urlencodedParser, (req, res, next) => {
    loginController.validateUser(req, res, next);
})

router.post('/add-user/', urlencodedParser, (req, res, next) => { 
    loginController.addNewUser(req, res, next);
})


module.exports = router;