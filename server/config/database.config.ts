import mongoose from "mongoose";
import { Env } from "./env.config.ts";
const connectToDatabase=async()=>{
    try {
        await mongoose.connect(Env.MONGO_URI);
        console.log("Database Connected");
    } catch (error) {
        console.log("Error connecting to DB",error);
        process.exit(1);
    }
};

export default connectToDatabase;