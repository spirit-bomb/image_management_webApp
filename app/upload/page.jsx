"use client"
import {useState} from 'react';
import axios from 'axios';
import {Blocks} from 'react-loader-spinner'
import {useRouter} from 'next/navigation';

function Upload() {
    const router=useRouter();
    const [img,setImg]=useState(null);
    const [loading,setLoading]=useState(false);

    const uploadImg=async(type,timeStamp,signature)=>{
        const data=new FormData();
        data.append("file",img)
        data.append("timestamp",timeStamp);
        data.append("signature",signature);
        data.append("api_key",process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
        
        try{
            let cloudName=process.env.NEXT_PUBLIC_CLOUDNAME;
            let resourceType=type;
            let api=`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`
            const res=await axios.post(api,data);
            const {secure_url}=res.data;
            return secure_url;
        }
        catch(error){
            console.log(error);
        }
    }
    const getSignature=async(file)=>{
        try{
            const res=await axios.post(`/api/sign`,file);
            return res.data;
        }
        catch(error){
            console.log(error);
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        try{
            setLoading(true);
            const {timeStamp,signature}=await getSignature('image')
            const imgUrl=await uploadImg("image",timeStamp,signature);
            //const back=await axios.post(`/api/upload`,{imgUrl})
            await fetch("/api/upload",
        {
          method:'POST',
          body:JSON.stringify({
            imgUrl:imgUrl
          })
        })
            setImg(null);
            setLoading(false);
            router.push('/')
        }
        catch(error){
            console.log(error);
        }
    }
  return (
    <div className="flex flex-col w-full">
        <div className="p-6">
            <p className="text-3xl lg:text-5xl font-bold mb-10 lg:mb-16">
                Upload Images
            </p>
            <form onSubmit={handleSubmit} className="">
                <div className="border-2 w-1/2 lg:w-1/3">
                    <input type="file" className=""
                    accept="image/*"
                    id="img"
                    onChange={(e)=>setImg((prev)=>e.target.files[0])} />
                </div>
                <div>
                    {loading?<Blocks
                height="60"
                width="70"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />:
                <button type="submit" className="text-lg ml-4 hover:font-semibold">
                    Upload
                </button>}
                </div>
            </form>
            <div className="mt-10">
            </div>
        </div>
    </div>

  )
}

export default Upload