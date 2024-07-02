import mongoose from "mongoose";

const connectMongoDB = async()=> {
    try{
        if(process.env.MONGO_DB_URI){
            await mongoose.connect(process.env.MONGO_DB_URI);
            console.log("connected");
        }
       console.log("mongo db uri not found")
    }catch(error){
        console.log(error);
        throw new Error("Error while connecting");
    }
}

export default connectMongoDB;