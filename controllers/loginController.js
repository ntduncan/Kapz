const User = require('../models/User');
const bcrypt = require('bcryptjs');

const validateUser = (req, res, next) => {
    const email = req.body.username;
    const password = req.body.password;

    User.findOne({username: email})
    .then(user => {
        if(!user) {
            return res.redirect('/login') //If we don't find a user return to the login
        }
        
        bcrypt.compare(password, user.password) //compare returns a boolean
        .then(doMatch => {
            if(doMatch){ //if we got true that means there was a match
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => { //Return to stop code execution
                    console.log(err);
                    res.redirect('/')
                })
            }
            res.redirect('/login')
        }).catch(err => {
            console.log(err);
            res.redirect('/login')
        });
    })
}

const addNewUser = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({username: username})
     .then((userDoc) => {
         // If the user exists return to the add user page
        if(userDoc){ 
            return res.redirect('/login/newUser')
        
        } else { // Else, create the new user in MongoDB
            return bcrypt //Used to encrypt the password
             .hash(password, 12) // 12 salt is considered highly secure
             .then(hashedPassword => {
                const user = new User({
                    username: username,
                    password: hashedPassword, 
                    cart: { items: []},
                });
        
                user.save() //Create user
                .catch(err => console.log(err));
             })
             .then(result => {
                res.redirect('/login');
             }) 

        }
     })

     .catch(err => {console.log(err)});
}

const logout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err)
        res.redirect('/')
    });
}

module.exports = {
    validateUser,
    addNewUser,
    logout,
}