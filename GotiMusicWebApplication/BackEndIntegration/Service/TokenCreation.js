const jwt = require('jsonwebtoken')
const SecertKey = '@#$%^&*(10901u'
function SetToken(user){
    const payload = {
        Name:user.Name,
        Email:user.Email,
        Role:user.Roles,
    }
    return jwt.sign(payload,SecertKey,{
        expiresIn:'1h'
    })
}
function VerifyToken(token){
    return jwt.verify(token,SecertKey);
}
module.exports = {
    SetToken , VerifyToken
}