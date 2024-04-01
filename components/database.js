import mongoose from 'mongoose';
let isConnected=false;
export const connectDB=async()=>{
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log("database connected");
    }
    try{
        await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI,{
            dbName:"cloud_images",
        })
        isConnected=true;
        console.log("mongoDb connected");
        
    }
    catch(error){
        console.log(error);
    }
}
