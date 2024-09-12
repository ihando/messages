import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import dotenv from "dotenv";

import indexRoute from "./src/routes/index";
//import "./middlewares/passport-middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:5173", // Allow only this origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes setup
app.use("/", indexRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
