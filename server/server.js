import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import transporter from "./config/nodemailer.js";

const app = express();
const port = process.env.PORT || 4000

connectDB();

const allowedOrigins = [
  /^http:\/\/localhost:\d+$/,
  /^http:\/\/127\.0\.0\.1:\d+$/,
  "https://mern-auth-client-6a29.onrender.com",
];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.some((allowedOrigin) => {
        if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        }
        return allowedOrigin === origin;
      });
      if (isAllowed) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
        
//API Endpoints
app.get('/', (req,res)=> res.send("API is working fine"));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.listen(port, ()=> console.log(`Server started on PORT: ${port}`));
app.get("/smtp-test", async (req, res) => {
  try {
    await transporter.verify();
    res.send("SMTP OK");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});
