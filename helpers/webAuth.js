module.exports = (req, res, next)=>{
    if(!req.session.userName)
        res.redirect('/auth/logout');
    else
        next();
}