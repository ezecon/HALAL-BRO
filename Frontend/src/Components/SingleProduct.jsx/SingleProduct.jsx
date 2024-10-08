import { TbManFilled } from "react-icons/tb";
import ComNavbar from '../Layoout/CommonNavbar/ComNavbar';
import { FaOpencart } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useToken } from "../Hook/useToken";

export default function SingleProduct() {
    const { id } = useParams();
    const [data, setData] = useState(null); // Initialized to null to handle loading state
    const [error, setError] = useState(null);
    const { token } = useToken();
    const navigate = useNavigate();
    const [userID, setUserID] = useState(null);
    const [size, setSize] = useState('S');
    const [amount, setAmount] = useState(1);

    const handleSize = (e) => {
        setSize(e.target.value);
    };

    const incrementAmount = () => {
        setAmount(prev => prev + 1);
    };

    const decrementAmount = () => {
        if (amount > 1) {
            setAmount(prev => prev - 1);
        }
    };

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios.post('https://halal-bro-server.vercel.app/api/v2/auth-user-info', { token });
                if (response.status === 200 && response.data.valid) {
                    setUserID(response.data.decoded.id);
                    console.log(response.data.decoded.id);
                } else {
                    console.log("Something went wrong");
                }
            } catch (error) {
                console.error('Error verifying token:', error);
            }
        };

        verifyToken();
    }, [token]);

    const handleCart = async () => {
        if (!userID) {
            toast.error("Please log in first.");
            return;
        }

        try {
            const productResponse = await axios.get(`https://halal-bro-server.vercel.app/api/v2/products/${id}`);
            if (productResponse.status === 200 && productResponse.data.data.status === "Available") {
                const cartResponse = await axios.post('https://halal-bro-server.vercel.app/api/v2/carts', {
                    name: data.name,
                    productId: data._id,
                    image: data.image,
                    price: data.price,
                    userId: userID,
                    size: size,
                    amount: amount
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

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await axios.get(`https://halal-bro-server.vercel.app/api/v2/products/${id}`);
                if (res.status === 200) {
                    setData(res.data.data);
                }
            } catch (err) {
                console.log(err);
                setError('Failed to fetch product data');
            }
        };

        if (id) {
            fetchItem();
        }
    }, [id]); // Dependency array to ensure the effect runs only when `id` changes

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (!data) {
        return <div className="flex flex-col justify-center items-center h-screen bg-black gap-y-4">
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
        </div>;
    }

    return (
        <div>
            <ComNavbar />
            <div className='flex justify-center items-center'>
                <div className='grid grid-cols-1 sm:grid-cols-2 justify-center items-center relative con'>
                    <div className='rounded-lg flex flex-col justify-center items-center'>
                        <h1 className='text-white font-bold new-amsterdam-regular text-5xl py-5'>{data.name}</h1>
                        <img src={data.image} className='w-2/3 my-10 rounded-lg shadow-xl hero-loop' alt={data.name} />
                        <p className='text-white font-bold new-amsterdam-regular text-2xl'>{data.price} ৳</p>
                    </div>
                    <div className='bg-white w-full h-full flex flex-col justify-center items-center'>
                        <h1 className="heading text-3xl mt-10 rounded-xl p-3 font-bold common border border-[#00800052]">{data.status}</h1>
                        <details className="group w-full max-w-lg py-10">
                            <summary className="mx-5 cursor-pointer bg-gradient-to-r from-green-500 to-[#c9de71] text-white px-6 py-3 rounded-md text-lg font-semibold flex justify-between items-center">
                                Product Description
                                <span className="transform transition-transform duration-300 group-open:rotate-180">
                                    <TbManFilled className="text-2xl" />
                                </span>
                            </summary>
                            <div className="mx-5 mt-2 bg-gray-100 p-4 rounded-md shadow-inner">
                                <p className="text-gray-700">
                                    <span className="font=bold montserrat-alternates-bold">Category:</span> <span className="montserrat-alternates-light">{data.category}</span>
                                    <br />
                                    {data.description}
                                    <br /><span className='text-sm font-bold'>Sizes:</span><br />
                                    <img className='rounded-lg border border-black' src="/list.jpg" alt="" />
                                </p>
                            </div>
                        </details>

                        <div className="mydict">
                            <div>
                                <label>
                                    <input value='S' onChange={handleSize} type="radio" name="radio" defaultChecked />
                                    <span>S</span>
                                </label>
                                <label>
                                    <input value='M' onChange={handleSize} type="radio" name="radio" />
                                    <span>M</span>
                                </label>
                                <label>
                                    <input value='L' onChange={handleSize} type="radio" name="radio" />
                                    <span>L</span>
                                </label>
                                <label>
                                    <input value='XL' onChange={handleSize} type="radio" name="radio" />
                                    <span>XL</span>
                                </label>
                                <label>
                                    <input value='XXL' onChange={handleSize} type="radio" name="radio" />
                                    <span>XXL</span>
                                </label>
                                <label>
                                    <input value='XXXL' onChange={handleSize} type="radio" name="radio" />
                                    <span>XXXL</span>
                                </label>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 border border-blue-gray-500 rounded my-2 py-1 px-[100px]">
                            <button onClick={decrementAmount} className="text-xl p-2">-</button>
                            <p className="border p-2">{amount}</p>
                            <button onClick={incrementAmount} className="text-xl p-2">+</button>
                        </div>
                        <div className="">
                            <button
                                onClick={handleCart}
                                className="flex gap-2 my-5 bg-white no-underline py-3 px-6 rounded-full shadow-lg font-medium text-[#1e6b7b] transition duration-[0.25s] hover:tracking-wider">
                                Add To Cart  <FaOpencart className="text-black" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
