"use client"
import axios from 'axios';
import {useState,useEffect} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {DNA} from 'react-loader-spinner';



function Display() {
    const router=useRouter();
    const [pics,setPics]=useState([]);
    const [loading,setLoading]=useState(true);
    const fetchPics=async()=>{
        setLoading(true)
        await axios.get(`/api/images`).then((res)=>{
            const data=res.data;
            setPics(data);
            setLoading(false)
        })
    }
    const handleDelete=async(id,imgUrl)=>{
        const hasConfirmed=confirm("Are you sure? you want to delete the selected image?");
        if(hasConfirmed){
            try{
                await axios.delete(`/api/remove?id=${id}&imgUrl=${imgUrl}`);
                const updatedPics=pics.filter((pic)=>pic._id!==id);
                setPics(updatedPics);
                alert("image deleted!");
            }
            catch(error){
                console.log(error);
            }
        }
    }
    const handleOpen=async(imgUrl)=>{
        router.push(imgUrl)
    }
    useEffect(()=>{
        fetchPics();
    },[])
  return (
    <div className="">
        {loading?<div className="flex flex-col
         justify-center mt-32 place-items-center">
            <DNA
        visible={true}
        height="200"
        width="200"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        />
        <div>
            <p className="font-semibold text-2xl text-gray-600">
                Loading Images...
            </p>
        </div>
        </div>:
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6
        xl:grid-cols-4">
            {pics.map((x,i)=>(
                <div className="mx-auto p-2" key={i}>
                    <div className="">
                        <Image src={x.image_url}
                        alt="pic"
                        width={400}
                        height={300}
                        className="border-2 hover:cursor-zoom-in"
                        onClick={()=>handleOpen(x.image_url)}/>
                    </div>
                    <div className="flex justify-end relative translate-y-[-30px]">
                        <button className="mr-3 text-white/50
                        hover:text-white hover:font-bold"
                        onClick={()=>handleDelete(x._id,x.image_url)}>
                            X
                        </button>
                    </div>
                </div>
            ))}
        </div>}
        
        

    </div>
  )
}
export const revalidate=0;
export default Display