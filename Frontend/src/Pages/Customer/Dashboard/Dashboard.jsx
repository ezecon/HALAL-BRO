import axios from "axios";
import { useEffect, useState } from "react";
import { MdBorderColor } from "react-icons/md";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "../../../Components/Layoout/Navbar/Navbar";
import { useToken } from "../../../Components/Hook/useToken";

export function Dashboard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { token, removeToken } = useToken();
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const verifyToken = async () => {

      try {
        const response = await axios.post('http://localhost:3000/api/v2/auth-user-info', { token });
        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.id);
        } else {
          console.log("Something wents wrong")
        }
      } catch (error) {
        console.error('Error verifying token:', error);
       //
      }
    };

    verifyToken();
  }, [token, navigate, removeToken]);
  if(loading){
    <>
    
    <div className="flex flex-col justify-center items-center h-screen bg-black gap-y-4">
       <span className="loader"></span>
       <div className="text-animation-container">
          <h1 className="text-animation">
            <span className="word">H</span>
            <span className="word">A</span>
            <span className="word">L</span>
            <span className="word">A</span>
            <span className="word">L</span>
            <span className="word"> </span>
            <span className="word">B</span>
            <span className="word">R</span>
            <span className="word">O</span>
          </h1>
        </div>
        <img src="logo/logo.jpg" className="w-14 rounded-full" alt="" />
      </div>
    </>
  }


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/v2/orders/`);
        if (response.status === 200) {
          setData(response.data.reverse());
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAcceptOrder = async (orderId) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/v2/orders/${orderId}`, {
        status: 'Delivered'
      });
      if (response.status === 200) {
        setData(prevData => prevData.map(order => 
          order._id === orderId ? { ...order, status: 'Accepted' } : order
        ));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleItem = (id) => {
    navigate(`/check-product/${id}`); // Use backticks for template literals
  };

  if (loading) {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-black gap-y-4">
        <span className="loader"></span>
        <div className="text-animation-container">
           <h1 className="text-animation">
             <span className="word">H</span>
             <span className="word">A</span>
             <span className="word">L</span>
             <span className="word">A</span>
             <span className="word">L</span>
             <span className="word"> </span>
             <span className="word">B</span>
             <span className="word">R</span>
             <span className="word">O</span>
           </h1>
         </div>
         <img src="logo/logo.jpg" className="w-14 rounded-full" alt="" />
       </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-green-500 to-[#c9de71] w-full h-full fixed">
        <Navbar/>
        <div className="py-10 flex flex-col justify-center items-center">
      <h1 className="m-3 text-2xl text-[white] font-bold montserrat-alternates-nice pt-20 flex justify-center gap-2">
        Dashboard <MdBorderColor className="text-3xl text-[white]" />
      </h1>

      <div className=" common w-full sm:w-2/3 p-5 bg-white rounded-xl">
        {data.filter(item=> item.userId===userID)
        .map((order) => (
          <div key={order._id} className="mb-10 border-b-2 border-[goldenrod]">
            <h2 className="text-xl font-semibold mb-2">Order ID: {order._id}</h2>
            <a href={`check-user/${order.userId}`}><button className=" border rounded-lg bg-[goldenrod] text-white px-2">User</button></a>
            <p className="text-sm text-gray-700">Total: ${order.total}</p>
            <p className="text-sm text-gray-700">Number: {order.number}</p>
            <p className="text-sm text-gray-700">Address: {order.address}</p>
            <p className="text-sm text-gray-700">Status: {order.status}</p>
            <p className="text-sm text-gray-700">Order Date: {new Date(order.date).toLocaleDateString()}</p>
            
         {order.status==="Accepted" && 
            <button className="btn-15 m-5" onClick={() => handleAcceptOrder(order._id)}>
            <span className="text-container">
              <span className="text">Received</span>
            </span>
          </button>}
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-lg p-4 flex flex-col items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover mb-4"
                  />
                  <h3 className="text-lg font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">Price: Tk {item.price}</p>
                  <p className="text-sm text-gray-500">Size: {item.size}</p>
                  <p className="text-sm text-gray-500">Amount: {item.amount}Pcs</p>
                  <p className="text-sm text-gray-500">Item Date: {new Date(item.date).toLocaleDateString()}</p>
                  <button onClick={() => handleItem(item.productId)} className="btn-60 w-1/2">
                    <span>Check Item</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
