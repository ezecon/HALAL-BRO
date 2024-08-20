import { MdBrowserUpdated, MdDelete  } from "react-icons/md";
import axios from "axios";
import { toast } from 'react-hot-toast'; // Import toast

export default function ProductCard({ product }) {
  const cardClasses = "p-4 rounded-lg shadow-lg bg- transform hover:scale-105 transition-transform duration-300";
  const {_id, name, price, image} = product;
  const handleDelete = async (id)=>{
    try{
      const res = await axios.delete(`https://halal-bro-server.vercel.app/api/v2/products/${id}`)
      if(res===200){
        toast.success("Product Deleted!")
      }
    }
    catch(ee){
      console.log(ee)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center hero-loop">
      <div className={cardClasses}>
        <img 
          src={image} 
          alt={`Image of ${name}`} 
          className="w-full h-40 object-cover rounded-md mb-4 transform transition-transform duration-1000 hover:scale-110"
        />
        <h3 className="new-amsterdam-regular text-xl font-semibold mt-2 hover:text-[goldenrod]">{name}</h3>
        <p className="new-amsterdam-regular text-lg text-gray-600">${price}</p>
        <div className="flex gap-2 justify-center">
        <a
          
          className="bg-[#e4e3e3] text-white inline-block py-3 px-6 rounded-full shadow-lg font-semibold transition-transform duration-300 hover:bg-[goldenrod] hover:scale-105"
        >
          <MdBrowserUpdated className="text-black"/>
        </a>
        <a
          onClick={()=>handleDelete(_id)}
          className="bg-[#e4e3e3] text-white inline-block py-3 px-6 rounded-full shadow-lg font-semibold transition-transform duration-300 hover:bg-[goldenrod] hover:scale-105"
        >
          <MdDelete  className="text-black"/>
        </a>
        </div>
      </div>
    </div>
  );
}
