import mongoose from "mongoose";

const connectDb = async() =>{
    try{
       
        await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log("db connedted!")
    }catch(err){
        console.log(err.message)
    }
}

export default connectDb;