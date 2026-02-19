const UserModel = require('../Models/UserModel')
const bcrypt = require('bcrypt');
const {SetToken} = require('../Service/TokenCreation')
const handleValidationOfEmailLogin = require('../Middleware/EmailValidationForLogin')
async function ComparePassword(PlanPassword,HashedPassword){
    try{
        const isMatched = await bcrypt.compare(PlanPassword,HashedPassword);
        return isMatched;
    }catch(err){
        console.log("Error while comparing the password");
        return err;
    }
}
async function handleverifyuser(req,res){
    const {Email , Password} = req.body;
    if(!Email || !Password){
        return res.status(400).json({status:`Bad Request`})
    }
    const VerifiedUser = await UserModel.findOne({Email:Email});    
    if(!VerifiedUser){
        return res.status(401).json({status:`Wrong Email Entered by the user`})
    }
    const verifyPassword = await ComparePassword(Password,VerifiedUser.Password)
    if(!verifyPassword){
        return res.status(401).json({status:`Wrong Password`})
    }
    const jwtToken = SetToken(VerifiedUser);
    res.cookie("JwtTOken",jwtToken);
    console.log("JWT token created");
    return res.status(200).json({status:`User Verified`,token:jwtToken}); // note that we have to also return the token if we want to see it 
}
module.exports = handleverifyuser