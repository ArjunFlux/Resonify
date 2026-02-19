const OptModel = require('../Models/OptModel');
const UserModel = require('../Models/UserModel')
const bcrypt = require('bcrypt')
async function handleOtpVerificationOfTheUser(req,res){
    const {VerificationCode , NewPassword} = req.body;
    if(!VerificationCode || !NewPassword){
        return res.status(400).json({status:`Incomplete Details provided by the user`})
    }
    try {
        const VerifiyOtp = await OptModel.findOne({Otp : VerificationCode})
        if(!VerifiyOtp){
            return res.status(401).json({status:`Unauthorized`})
        }
        const VerifiedOtpEmail = VerifiyOtp.Email;
        const saltRoundForHashing = 10;
        const HasedPassword = await bcrypt.hash(NewPassword,saltRoundForHashing)
        const FindVerifiedEmailInMainDatabase = await UserModel.updateOne({Email : VerifiedOtpEmail} , {$set:{Password : HasedPassword}});
        if(!FindVerifiedEmailInMainDatabase){
            return res.status(404).json({status:`Couldn't update the Password because couldn't find the Email Id`});
        }
        return res.status(202).json({status:`Successfully Changed the Password of the User`});
    }catch(err){
        console.log("Error in verification Process of the Opt : ",err)
    }
}
module.exports = handleOtpVerificationOfTheUser