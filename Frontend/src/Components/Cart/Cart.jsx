import { FaOpencart } from "react-icons/fa";
import { useToken } from "../Hook/useToken";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import toast from "react-hot-toast";
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
 

export default function Cart() {
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e);
  };

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        removeToken();
        return;
      }
      try {
        const response = await axios.post("https://ask-rashana-server.vercel.app/api/verifyToken", { token });
        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.id);
        } else {
          removeToken();
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        removeToken();
      }
    };

    verifyToken();
  }, [token, navigate, removeToken]);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const res = await axios.get(`https://ask-rashana-server.vercel.app/api/carts/${userID}`);
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
      const response = await axios.delete(`https://ask-rashana-server.vercel.app/api/carts/single/${id}`);

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
      const response = await axios.delete(`https://ask-rashana-server.vercel.app/api/carts/${userID}`);

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
    if (newAmount < 0.5) return;

    try {
        console.log(`Updating item with ID: ${id} to amount: ${newAmount}`);
        const response = await axios.put(`https://ask-rashana-server.vercel.app/api/carts/single/${id}`, {
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


  const handleOrder = async () => {
    if(paymentMethod==="Bkash"){
      toast.error("Bkash Not Available")
      handleOpen()
    }else if(paymentMethod==="Cash On Delivery"){
      try {
        const response = await axios.post(`https://ask-rashana-server.vercel.app/api/order/`,{
          userId: userID,
          items: data,
          address,
          total: totalPrice
        });
    
        if (response.status === 200) {
          toast.success(" Order Placed Successfully!");
        
        }
      } catch (err) {
        console.log(err);
        toast.error("Error while ordering");
      }
    }
    else{
      toast.error("Select Payment Method")
    }
    handleDelete()
  };

  return (
  <div>
     <ComNavbar/>

<div>
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
              <p className="border border-[goldenrod] text-[goldenrod] rounded flex justify-center gap-1 text-xs sm:text-sm md:text-base w-full sm:w-2/3 md:w-1/3 lg:w-1/4">
                <CiSquarePlus
                  onClick={() => handleCount(item._id, item.amount, 0.5)}
                  className="text-4xl sm:text-2xl md:text-4xl py-2"
                />
                <span className="font-medium border p-1">{item.amount} Kg</span>
                <CiSquareMinus
                  onClick={() => handleCount(item._id, item.amount, -0.5)}
                  className="text-4xl sm:text-2xl md:text-4xl py-2"
                />
              </p>
              <button onClick={() => handleSingleDelete(item._id)} className="btn-60 my-3">
                <span>Remove</span>
              </button>
            </div>
          ))}
          <div className="text-right text-md font-bold font-playwrite-gb-s">
            Total: BDT {totalPrice}
          </div>
          <button  onClick={handleOpen} className="btn-15">
            <span>Check Out</span>
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
              required
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
  );
}
