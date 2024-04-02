import Image from '../../../models/image'
import {connectDB} from '../../../components/database';
import {NextResponse} from 'next/server';
 export const PUT=async(req,res)=>{
    try{
        await connectDB();
        const images=await Image.find({})
        //console.log(images);
        //return new Response(images,{status:200})
        //return new Response (JSON.stringify(images));
        return NextResponse.json(images);
    }
    catch(error){
        console.log(error);
        return NextResponse("error in getting images",{status:404});
    }
 }