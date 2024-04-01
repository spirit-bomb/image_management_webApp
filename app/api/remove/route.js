import {connectDB} from '../../../components/database';
import Image from '../../../models/image';
import {v2 as cloudinary} from 'cloudinary';
import {NextResponse} from 'next/server';

cloudinary.config({
    cloud_name:process.env.NEXT_PUBLIC_CLOUDNAME,
    api_key:process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret:process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
    secure:true
})

export const DELETE=async(req)=>{
    try{
        await connectDB();
        const url=new URL(req.url);
        const param=new URLSearchParams(url.searchParams)
        const imgUrl=param.get('imgUrl');
        const arr=imgUrl.split('/');
        const img=arr[arr.length-1]
        const imgName=img.split('.')[0];
        const imgId=param.get('id');
        await Image.findByIdAndDelete(imgId);
        await cloudinary.uploader.destroy(imgName,(err,res)=>{
            console.log(err,res);
        });
        return NextResponse.json({
            success:true,
            message:'deletion successfull'
        },{status:200}) 
    }
    catch(error){
        console.log(error);
        return new Response("error in deletion",{status:500});
    }    
}