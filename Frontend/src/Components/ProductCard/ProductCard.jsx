import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaOpencart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const cardClasses = "p-4 rounded-lg shadow-lg bg-white transform hover:scale-105 transition-transform duration-300";
  const {_id, name, price, image} = product;
  
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://halal-bro-server.vercel.app/api/v2/auth/user-info', { withCredentials: true });
        setUserID(response.data.user.id);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, []);

  const handleCart = async () => {
    if (!userID) {
      toast.error("Please log in first.");
      return;
    }

    try {
      const productResponse = await axios.get(`https://halal-bro-server.vercel.app/api/v2/products/${_id}`);
     // console.log(productResponse.data.data)
      if (productResponse.status === 200 && productResponse.data.data.status === "Available") {
        const cartResponse = await axios.post('https://halal-bro-server.vercel.app/api/v2/carts', {
          name,
          productId: _id,
          image,
          price,
          userId: userID,
          size: 'L',
          amount: 1
        });
        if (cartResponse.status === 200) {
          toast.success("Added to Cart!");
        } else {
          toast.error("Failed to add to cart.");
        }
      } else {
        toast.error("Product not available.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  const handleNavigate = (id) => {
    navigate(`check-product/${id}`);
  };

  return (
    <div className="flex flex-col justify-center items-center hero-loop">
      <div className={cardClasses}>
        <img 
          onClick={() => handleNavigate(_id)}
          src={image} 
          alt={`Image of ${name}`} 
          className="w-full h-40 object-cover rounded-md mb-4 transform transition-transform duration-1000 hover:scale-110 cursor-pointer"
        />
        <h3 className="text-xl font-semibold mt-2 hover:text-[goldenrod]">{name}</h3>
        <p className="text-lg text-gray-600">${price}</p>
        <div className="flex justify-center mt-4">
          <p
            onClick={handleCart}
            className="bg-[#e4e3e3] text-black inline-block py-3 px-6 rounded-full shadow-lg font-semibold transition-transform duration-300 hover:bg-[goldenrod] hover:scale-105 cursor-pointer"
          >
            <FaOpencart />
          </p>
        </div>
      </div>
    </div>
  );
}
