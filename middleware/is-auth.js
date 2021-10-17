module.exports = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.redirect('/login')
    }
    next(); //Continues to next middleware in line
}