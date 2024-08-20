import { FaOpencart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import toast from "react-hot-toast";
import { IoBagCheckOutline } from "react-icons/io5";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import ComNavbar from "../Layoout/CommonNavbar/ComNavbar";
import { useNavigate } from "react-router-dom";
 

export default function Cart() {
  const [userID, setUserID] = useState(null);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate()
  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e);
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Attempt to fetch user info from backend
        const response = await axios.get('https://halal-bro-server.vercel.app/api/v2/auth/user-info', { withCredentials: true });
        setUserID(response.data.user.id);
      } catch (error) {
        navigate(`/login`)
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, []); // Empty dependency array to run only on component mount
  if(loading){
    <>
    
    <p>loading</p></>
  }

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const res = await axios.get(`https://halal-bro-server.vercel.app/api/v2/carts/${userID}`);
        if (res.status === 200) {
          setData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (userID) {
      fetchCarts();
    }
  }, [userID]);

  const totalPrice = data.reduce((total, item) => total + item.price*item.amount, 0);

  const handleSingleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://halal-bro-server.vercel.app/api/v2/carts/single/${id}`);

      if (response.status === 200) {
        toast.success("Item Deleted!");
        setData(data.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.log(err);
      toast.error("Error while deleting");
    }
  };
  
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`https://halal-bro-server.vercel.app/api/v2/carts/${userID}`);

      if (response.status === 200) {
        toast.success("Item Deleted!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error while deleting");
    }
  };

  const handleCount = async (id, currentAmount, change) => {
    const newAmount = currentAmount + change;

    // Ensure the new amount does not fall below 0.5
    if (newAmount < 1) return;

    try {
        console.log(`Updating item with ID: ${id} to amount: ${newAmount}`);
        const response = await axios.put(`https://halal-bro-server.vercel.app/api/v2/carts/single/${id}`, {
            amount: newAmount,
        });

        if (response.status === 200) {
            setData(prevData => 
                prevData.map(item => 
                    item._id === id ? { ...item, amount: newAmount } : item
                )
            );
            toast.success("Item count updated");
        } else {
            console.error(`Failed to update item. Status code: ${response.status}`);
            toast.error("Failed to update item count");
        }
    } catch (err) {
        console.error('Error while updating item:', err);
        toast.error("Error while updating");
    }
};
const handleSizeChange = async (id, newSize) => {
    try {
        console.log(`Updating item with ID: ${id} to size: ${newSize}`);
        const response = await axios.put(`https://halal-bro-server.vercel.app/api/v2/carts/single1/${id}`, {
            size: newSize,
        });

        if (response.status === 200) {
            setData(prevData => 
                prevData.map(item => 
                    item._id === id ? { ...item, size: newSize } : item
                )
            );
            toast.success("Item size updated");
        } else {
            console.error(`Failed to update item size. Status code: ${response.status}`);
            toast.error("Failed to update item size");
        }
    } catch (err) {
        console.error('Error while updating item size:', err);
        toast.error("Error while updating");
    }
};


  const handleOrder = async () => {
    if(paymentMethod==="Bkash"){
      toast.error("Bkash Not Available")
      handleOpen()
    }else if(paymentMethod==="Cash On Delivery"){
      if(address===''){
        toast.error("Address is empty")
        
        handleOpen()
        return;
      }
      if(number===''){
        toast.error("Number is empty")
        
        handleOpen()
        return;
      }
      try {
        const response = await axios.post(`https://halal-bro-server.vercel.app/api/v2/orders/`,{
          userId: userID,
          items: data,
          address,
          number,
          total: totalPrice
        });
    
        if (response.status === 200) {
          toast.success(" Order Placed Successfully!");
          handleDelete()
        }
      } catch (err) {
        console.log(err);
        toast.error("Error while ordering");
      }
    }
    else{
      toast.error("Select Payment Method")
    }
    
  };

  return (
   <div>
    <ComNavbar/>
     <div className="flex justify-center common">
      <div className="w-full sm:w-1/2">
      <h1 className="text-2xl text-[goldenrod] font-bold montserrat-alternates-nice pt-20 flex justify-center gap-2">
        CART <FaOpencart className="text-3xl text-[goldenrod]" />
      </h1>
      <div>
        <div className="border border-[goldenrod] rounded-xl m-5 p-10">
          <h2 className="font-bold text-[goldenrod] font-playwrite-gb-s">Items:</h2>
          {data.length > 0 ? (
            <>
              {data.map((item) => (
                <div key={item._id} className="montserrat-alternates-nice underline-offset-1 p-4 border-b border-gray-300">
                  <img src={item.image} className="w-16 rounded-md" alt={item.name} />
                  <p className="text-lg font-semibold text-gray-700">
                    Product Name: <span className="text-black">{item.name}</span>
                  </p>
                  <p className="text-md text-gray-600">
                    Price: <span className="font-medium text-black">BDT {item.price*item.amount}</span>
                  </p>
                  <p className=" text-gray-600">
                        Size: 
                        <span className="ml-2 font-medium text-black">
                            {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((sizeOption) => (
                                <button
                                    key={sizeOption}
                                    className={`p-1 border rounded mx-1 ${item.size === sizeOption ? 'bg-black text-white' : 'bg-white text-black'}`}
                                    onClick={() => handleSizeChange(item._id, sizeOption)}
                                >
                                    {sizeOption}
                                </button>
                            ))}
                        </span>
                    </p>
                  <p className="border border-[goldenrod] text-[goldenrod] rounded flex justify-center gap-1 text-xs sm:text-sm md:text-base w-full sm:w-2/3 md:w-1/3 lg:w-1/4">
                    <CiSquarePlus
                      onClick={() => handleCount(item._id, item.amount,1 )}
                      className="text-4xl sm:text-2xl md:text-4xl py-2"
                    />
                    <span className="font-medium border p-1 px-2 text-sm">{item.amount}Pc</span>
                    <CiSquareMinus
                      onClick={() => handleCount(item._id, item.amount, -1)}
                      className="text-4xl sm:text-2xl md:text-4xl py-2"
                    />
                  </p>
                  <button onClick={() => handleSingleDelete(item._id)} className="btn-60 my-3">
                    <span>Remove</span>
                  </button>
                </div>
              ))}
              <div className="text-right text-md font-bold montserrat-alternates-bold">
                Total: BDT {totalPrice}
              </div>
              <button  onClick={handleOpen} className="btn-15">
                <span className="gap-2 flex">Check Out <IoBagCheckOutline className="text-xl"/></span>
              </button>
            </>
          ) : (
            <p>No items in the cart.</p>
          )}
        </div>
      </div>
      <>
      <Dialog open={open} size={"xs"}handler={handleOpen}>
        <DialogHeader>Order</DialogHeader>
        <DialogBody>
                <div className="my-4">
                <Input 
                  label="Address"
                  value={address}
                  onChange={handleAddressChange}
                  require
                />
              </div>
                <div className="my-4">
                <Input 
                  label="Number"
                  value={number}
                  onChange={handleNumberChange}
                  require
                />
              </div>
              <div className="my-4">
                <Select 
                  label="Select Payment Method"
                  value={paymentMethod}
                  onChange={handlePaymentMethodChange}
                  required
                >
                  <Option value="Cash On Delivery">Cash On Delivery</Option>
                  <Option value="Bkash">Bkash</Option>
                </Select>
              </div>

        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOrder}>
            <span>Confirm</span>
          </Button>
          
        </DialogFooter>
      </Dialog>
    </>
    </div>
   </div>
   </div>
  );
}
