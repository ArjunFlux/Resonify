const {VerifyToken} = require('../Service/TokenCreation')
async function checkforauthentication(req,res,next){
    const isCookiePresent = req.cookies.JwtTOken;
    if(!isCookiePresent){
        res.redirect('/login')
        return res.status(401).json({status:`User is not logged In`})
    }
    const VerifiedUser = VerifyToken(isCookiePresent);
    if(!VerifiedUser){
        res.redirect('/login')
        return res.status(401).json({status:`Wrong Token`})
    }
    req.user = VerifiedUser
    next();
}
module.exports = checkforauthentication