const UserModel = require('../Models/UserModel')
const bcrypt = require('bcrypt');
const handleValidationOfEmailSignIn = require('../Middleware/EmailValidationForSignIn')
async function handleHashedPasswrod(Password){
    const saltRound = 10;
    try{
        const HashedPasswrod = await bcrypt.hash(Password,saltRound);
        return HashedPasswrod;
    }catch(err){
        console.log("Error while generating the Hashed password");
        return err;
    }
} 
async function handleCreateUser(req,res) {
    const body = req.body;
    if(!body.Name || !body.Email || !body.Password){
        return res.status(400).json({status:`Bad Request`})
    }
    console.log(body);
    const ValidateEmail = handleValidationOfEmailSignIn(body.Email);
    if(!ValidateEmail){
        return res.status(404).json({status:`Enter a valid Email Id`});
    }
    const HashedPasswrod = await handleHashedPasswrod(body.Password);
    const UserInputDetails = await UserModel.create({
        Name : req.body.Name,
        Email : req.body.Email,
        Password:HashedPasswrod,
        Roles : "Normal",
    })
    if(!UserInputDetails){
        return res.status(500).json({status:`Internal Server Error`})
    }
    return res.status(201).json({status:`New User Created`})
}
module.exports = handleCreateUser