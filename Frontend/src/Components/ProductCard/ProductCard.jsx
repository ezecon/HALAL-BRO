import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaOpencart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const cardClasses = "p-4 rounded-lg shadow-lg bg- transform hover:scale-105 transition-transform duration-300";
  const {_id, name, price, image} = product;
  
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Attempt to fetch user info from backend
        const response = await axios.get('http://localhost:3000/api/v2/auth/user-info', { withCredentials: true });
        setUserID(response.data.user.id);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, []); // Empty dependency array to run only on component mount


  const handleCart=async()=>{
   if(!userID){
      toast.error("Login First")
    }
    try{
      const response = await axios.post( `http://localhost:3000/api/v2/carts`,{
        name: name,
        productId: _id,
        image: image,
        price: price,
        userId: userID,
        size:'L',
        amount:1
      })
      if(response.status===200){
        toast.success("Added to Cart!")
      }
      else{
        toast.error("Something wents wrong!")
      }

    }catch(error){
      console.log(error)
      toast.error("Something wents wrong!")
    }
  }


  const handleNaviagte=(id)=>{
    navigate(`check-product/${id}`)
  }
  return (
    <div className="flex flex-col justify-center items-center hero-loop">
      <div className={cardClasses}>
        <img 
        onClick={()=>handleNaviagte(_id)}
          src={image} 
          alt={`Image of ${name}`} 
          className="w-full h-40 object-cover rounded-md mb-4 transform transition-transform duration-1000 hover:scale-110"
        />
        <h3 className="new-amsterdam-regular text-xl font-semibold mt-2 hover:text-[goldenrod]">{name}</h3>
        <p className="new-amsterdam-regular text-lg text-gray-600">${price}</p>
        <div className="flex justify-center">
        <p
          
          className="bg-[#e4e3e3] text-white inline-block py-3 px-6 rounded-full shadow-lg font-semibold transition-transform duration-300 hover:bg-[goldenrod] hover:scale-105"
        >
          <FaOpencart onClick={handleCart} className="text-black"/>
        </p>
        </div>
      </div>
    </div>
  );
}
