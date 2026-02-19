const express = require("express");
const app = express();
const userRouter = require("./Routes/UserRoute");
const ApiRoute = require('../BackEndIntegration/Routes/ApiRoute')
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = 8001;
// Cors handling
app.use(
  cors({
    origin: "http://localhost:5173", // url which is requsting to the server
    methods: ["GET", "POST", "PUT", "DELETE"], // methods which are allowed
    credentials: true,
  }),
);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Routes
app.use("/user", userRouter);
app.use("/api",ApiRoute);
// Loutout Router to delete the cookie
app.get("/logout", (req, res) => {
  res.clearCookie("JwtTOken");
  return res.status(200).json({ status: `Successfully delete the cookie` });
});
// Listen at the Port
app.listen(PORT, () => {
  console.log(`The server is live at the port ${PORT}`);
});
