const express = require('express')
const router = express.Router()
// Function exported from different files 
const handleCreateUser = require('../Controllers/HandleCreateUser')
const handleverifyuser = require('../Controllers/HandleVerifyUser')
const handleUpgradeUserRole = require('../Controllers/HandleUpgradeRole')
const handleEmailSend = require('../Controllers/EmailSend')
const handleOtpVerificationOfTheUser = require('../Controllers/HandleOtpVerificationOfTheUser')
const CheckTheEmailbeforeTheOtpGeneration = require('../Middleware/CheckTheEmailBeforeTheOtpGeneration')
const handleMusicModelCreation = require('../Controllers/HandleMusicModel')
const checkforauthentication = require('../Middleware/CheckForAuthentication')
// Route for the connection between the Server and Database
router.post('/create',handleCreateUser) // signup
router.post('/login',handleverifyuser) // login
router.post('/emailverification',CheckTheEmailbeforeTheOtpGeneration,handleEmailSend);
router.post('/verifiy',handleOtpVerificationOfTheUser)
// This is a protected routes 
router.post('/upgrade',checkforauthentication,handleUpgradeUserRole)
router.post('/createmusic',handleMusicModelCreation)
module.exports = router;