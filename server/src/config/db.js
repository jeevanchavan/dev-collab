import mongoose from "mongoose";

const connectToDB =async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED SUCCESSFULLY");
    } catch (error) {
        console.error("error connecting MONGODB:",error)
    }
}

export default connectToDB