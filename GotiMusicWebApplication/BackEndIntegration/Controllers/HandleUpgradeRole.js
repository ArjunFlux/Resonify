const UserModel = require('../Models/UserModel');
const AdminPassword = '@#$!@#$EYVYUBRBIIRNODOPDNNOB$';
const bcrypt = require('bcrypt');
async function ComparePassword(PlanPassword,HashedPassword){
    try{
        const isMatched = await bcrypt.compare(PlanPassword,HashedPassword);
        return isMatched;
    }catch(err){
        console.log("Error while comparing the password");
        return err;
    }
}
async function handleUpgradeUserRole(req,res){
    const {Email,Password,UserAdminPassword} = req.body;
    if(!UserAdminPassword){
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
    if(UserAdminPassword !== AdminPassword){
        return res.status(403).json({status:`Forbidden to change the role`})
    }
    const ChangedUSerRole = await UserModel.findOneAndUpdate({Email:Email},{$set:{Roles:"Admin"}});
    if(!ChangedUSerRole){
        return res.status(501).json({status:`Change of role wasn't successfully implemented`})
    }
    return res.status(200).json({status:`Change of role successfully implemented`})
}
module.exports = handleUpgradeUserRole