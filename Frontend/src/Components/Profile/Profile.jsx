import { Button } from "@material-tailwind/react";
import Navbar from "../Layoout/Navbar/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profile() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Attempt to fetch user info from backend
        const response = await axios.get('https://halal-bro-server.vercel.app/api/v2/auth/user-info', { withCredentials: true });
        setUserID(response.data.user);
      } catch (error) {
        navigate(`/login`)
        console.log(error)
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, []); 

  if(loading){
    <><p>loading</p></>
  }
  
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userID && userID.id) { // Ensure userID and userID.id are not null
        try {
          const response = await axios.get(`https://halal-bro-server.vercel.app/api/v2/users/${userID.id}`);
          if (response.status === 200) {
            setUserInfo(response.data.item);
            console.log(response.data.item); // Make sure to log the response data
          } else {
            console.log(response.data);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
  
    fetchUserInfo();
  }, [userID]); // Dependency array includes userID

  return (
   <div className="profile-left">
    <Navbar/>
     <div className="profile-left grid grid-cols-1 sm:grid-cols-2 gap-6 p-10 lg:px-36">
      <div className="flex justify-center items-center">
        <img className="rounded-full w-3/4 sm:w-2/3 lg:w-1/2" src="/logo/logo.jpg" alt="Profile Logo" />
      </div>
      <div className="bg-white rounded-xl w-full h-full flex flex-col justify-center items-center text-center">
        <img className="w-36 rounded-xl hero-loop mb-5" src="/2.jpg" alt="Profile Picture" />
        <h1 className="text-2xl font-bold mb-3 montserrat-alternates-bold">{userInfo ? userInfo.displayName : <p>Loading</p>}</h1>
        <div className="text-left text-md text-gray-600 space-y-2 montserrat-alternates-regular">
          <p> <span className="font-bold">Address: </span> {userInfo ? userInfo.address : <p>Loading</p>}</p>
          <p><span className="font-bold">Number: </span>{userInfo ? userInfo.number : <p>Loading</p>}</p>
          <p><span className="font-bold">Email: </span>{userInfo ? userInfo.email : <p>Loading</p>}</p>
          <p><span className="font-bold">District: </span>{userInfo ? userInfo.district : <p>Loading</p>}</p>
          <p><span className="font-bold">Account Created: </span>{userInfo ? userInfo.date.slice(0,10) : <p>Loading</p>}</p>
        </div>
        <Button className="my-5">Update</Button>
      </div>
    </div>
   </div>
  );
}
 