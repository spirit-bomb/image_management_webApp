import Image from '../../../models/image';
import {connectDB} from '../../../components/database'

export const POST=async(req,res)=>{
    const {imgUrl}=await req.json();
    if(!imgUrl){
        return new Response("image url is required",{status:400});
    }
    try{
        await connectDB();
        await Image.create({
            image_url:imgUrl,
        })
        return new Response("done",{status:201})
    }
    catch(error){
        console.log(error);
        return new Response("error in storing image url!",{status:500});
    }
}
