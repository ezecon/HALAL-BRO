import { Button, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToken } from "../Hook/useToken";
import toast from "react-hot-toast";
import Navbar from "../Layoout/Navbar/Navbar";

export default function Profile() {
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  let temp = {
    name: "",
    address: "",
    number: "",
    email: "",
    district: "",
    image: "",
    date: ""
  };
  const [userInfo, setUserInfo] = useState(temp);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/v2/auth-user-info', { token });
        if (response.status === 200 && response.data.valid) {
          setUserID(response.data.decoded.id);
          console.log(userID)
        } else {
          console.log("Token verification failed");
          removeToken();
          navigate('/login'); // Redirect to login if token is invalid
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        removeToken();
        navigate('/login'); // Redirect to login if there's an error
      }
    };

    verifyToken();
  }, [token, navigate, removeToken]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userID) {
        try {
          const response = await axios.get(`http://localhost:3000/api/v2/users/${userID}`);
          if (response.status === 200) {
            setUserInfo(response.data.item);
            console.log(response.data.item);
          } else {
            console.log(response.data);
          }
        } catch (err) {
          console.error('Error fetching user info:', err);
        }
      }
    };

    fetchUserInfo();
  }, [userID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/v2/users/${userID}`, userInfo);
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile. Please try again.");
    }
  };

  const defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkoyUQaux4PEUmEPGc7PodeN8XbgC4aOBsug&s";

  return (
    <div className="profile-left">
      <Navbar />
      <div className="profile-left grid grid-cols-1 sm:grid-cols-2 gap-6 p-10 lg:px-36">
        <div className="flex justify-center items-center">
          <img className="rounded-full w-3/4 sm:w-2/3 lg:w-1/2" src="/logo/logo.jpg" alt="Profile Logo" />
        </div>
        <div className="bg-white rounded-xl w-full h-full flex flex-col justify-center items-center text-center">
          <img className="w-36 rounded-xl hero-loop mb-5" src={userInfo?.image || defaultImage} alt="Profile Picture" />
          {isEditing ? (
            <div className="px-5">
              <Input
                name="name"
                value={userInfo.name}
                onChange={handleInputChange}
                label="Name"
                className="mb-3"
              />
              <Input
                name="address"
                value={userInfo.address}
                onChange={handleInputChange}
                label="Address"
                className="mb-2"
              />
              <Input
                name="number"
                value={userInfo.number}
                onChange={handleInputChange}
                label="Number"
                className="mb-2"
              />
              <Input
                name="district"
                value={userInfo.district}
                onChange={handleInputChange}
                label="District"
                className="mb-2"
              />
            </div>
          ) : (
            <div className="px-5">
              <h1 className="text-2xl font-bold mb-3 montserrat-alternates-bold">
                {userInfo ? userInfo.name : "Loading..."}
              </h1>
              <div className="text-left text-md text-gray-600 space-y-2 montserrat-alternates-regular">
                <p>
                  <span className="font-bold">Address: </span>
                  {userInfo ? userInfo.address : "Loading..."}
                </p>
                <p>
                  <span className="font-bold">Number: </span>
                  {userInfo ? userInfo.number : "Loading..."}
                </p>
                <p>
                  <span className="font-bold">Email: </span>
                  {userInfo ? userInfo.email : "Loading..."}
                </p>
                <p>
                  <span className="font-bold">District: </span>
                  {userInfo ? userInfo.district : "Loading..."}
                </p>
                <p>
                  <span className="font-bold">Account Created: </span>
                  {userInfo ? userInfo.date.slice(0, 10) : "Loading..."}
                </p>
              </div>
            </div>
          )}
          <Button onClick={() => setIsEditing(!isEditing)} className="my-5">
            {isEditing ? "Cancel" : "Edit"}
          </Button>
          {isEditing && (
            <Button onClick={handleUpdate} className="my-5">
              Update
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
