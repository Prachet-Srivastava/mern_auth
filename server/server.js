import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000

connectDB();

const allowedOrigins = [/^http:\/\/localhost:\d+$/, /^http:\/\/127\.0\.0\.1:\d+$/]

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: (origin, callback) => {
        if(!origin || allowedOrigins.some(allowedOrigin => allowedOrigin.test(origin))){
            return callback(null, true)
        }
        return callback(new Error('Not allowed by CORS'))
    },
    credentials: true
}))
        
//API Endpoints
app.get('/', (req,res)=> res.send("API is working fine"));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.listen(port, ()=> console.log(`Server started on PORT: ${port}`));
