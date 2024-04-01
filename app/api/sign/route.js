import {v2 as cloudinary} from 'cloudinary';
import {connectDB} from '../../../components/database'
import {NextResponse} from 'next/server';

cloudinary.config({
    cloud_name:process.env.NEXT_PUBLIC_CLOUDNAME,
    api_key:process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret:process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
    secure:true
})

export const POST=async(req,res)=>{
    
    try{
        const {file}=req.body;
        await connectDB();
        const timeStamp=Math.round((new Date).getTime()/1000);
        const signature=cloudinary.utils.api_sign_request({
            timestamp:timeStamp,
            file
        },'PICjSw_FC8POpkTTphMxSjvCgd0');
        return NextResponse.json({
            timeStamp,
            signature
        },{status:200})
    }
    catch(error){
        console.log(error);
        return new Response("error in generating signature!",{status:500});
    }
}