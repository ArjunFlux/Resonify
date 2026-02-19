const {validate} = require('deep-email-validator')
async function handleValidationOfEmailLogin(Email){
    const ValidateEmail = await validate(Email,{validateSMTP : false}); // due to SMTP check the response time was very high because of the check done in the domain side
    if(!ValidateEmail){
        return res.status(400).json({status:`Please Enter a Valid email id `})
    }
    console.log("The Email has been validated");
}
module.exports= handleValidationOfEmailLogin