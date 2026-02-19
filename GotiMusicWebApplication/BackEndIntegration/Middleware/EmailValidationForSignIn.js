const {validate} = require('deep-email-validator')
async function handleValidationOfEmailSignIn(Email){
    console.log(Email)
    const ValidateEmailSignIn = await validate(Email);
    if(!ValidateEmailSignIn){
        return res.status(400).json({status:`Please Enter a Valid email id `})
    }
    console.log("The Email has been validated");
}
module.exports= handleValidationOfEmailSignIn