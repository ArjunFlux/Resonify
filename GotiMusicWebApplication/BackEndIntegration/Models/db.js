const mongoose = require("mongoose");
const mongo_url = process.env.MONGO_CON;
mongoose
  .connect(mongo_url, { family: 4, retryWrites: true, w: "majority" })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log("Failed To Connect", err);
  });
