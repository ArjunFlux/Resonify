const UserModel = require('../Models/UserModel')
async function CheckTheEmailbeforeTheOtpGeneration(req,res,next){
    const {Email} = req.body;
    const FindTheUser = await UserModel.findOne({Email:Email});
    if(!FindTheUser){
        console.log("The User is not registed in the database")
        return res.status(401).json({status:`Error while Searching the user for forget password`})
    }
    next();
}
module.exports = CheckTheEmailbeforeTheOtpGeneration;