const nodemailer = require("nodemailer");
const OtpModel = require("../Models/OptModel");
async function handleEmailToSend(req, res) {
const RandomNumberOtp = Math.floor(Math.random() * (10000 - 1000)) + 1000;
  try {
    const { Email } = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail", 
      auth: {
        user: "upadhyayparth3010@gmail.com",
        pass: "mptt zuyq zuxa kmlk",
      },
    });
    const mailOptions = {
      from: '"Parth Upadhyay" <upadhyayparth3010@gmail.com>',
      to: Email,
      subject: "Email verification",
      text: `The Email verification Code is : ${RandomNumberOtp} , \n - Team Resonify`,
    };
  // Find the Email in the userDatabase , if the email is present than only send otp otherwise tell to login first
  // Saving the Opt into the database for the verification purpose:
    try{
      const UpdateOptDetail = await OtpModel.create({
        Email : Email,
        Otp : RandomNumberOtp
      })
      if(!UpdateOptDetail){
        console.log("Error while Saving the opt verification")
      }else{
        console.log("Successfully Saved the Opt Details")
      }
    }catch(err){
      console.log("Error : ",err);
    }
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent:", info.messageId);
    return res.status(200).json({ status: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ status: "Failed to send email", error: error.message });
  }
}
module.exports = handleEmailToSend;
