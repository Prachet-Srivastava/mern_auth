import mongoose from "mongoose";

const connectDB = async ()=> {

    mongoose.connection.on('connected', ()=> console.log("Database Conncted"));


    await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth1`)
};

export default connectDB;