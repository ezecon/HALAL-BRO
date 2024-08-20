import {
  Avatar,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Option,
  Select,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast'; // Import toast
import { Link, useNavigate } from "react-router-dom";
import { useToken } from "../../../Components/Hook/useToken";

export default function Navbar() {
  const [displayComponent, setDisplayComponent] = useState(null);
  const [data, setData] = useState(true);
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleOpen = () => setOpen(true); // Open dialog
  const handleClose = () => setOpen(false); // Close dialog
  const { token, removeToken } = useToken();
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userID) {
        try {
          const response = await axios.get(`http://localhost:3000/api/v2/users/${userID}`);
          if (response.status === 200) {
            setUserInfo(response.data.item);
          } else {
            console.log(response.data);
          }
        } catch (err) {
          console.error('Error fetching user info:', err);
        }
      }
    };

    if (userID) {
      fetchUserInfo();
    }
  }, [userID]);

  const temp = () => {
    setData(false);
  };

  const handleSubmit = async () => {
    if (!productName || !description || !price || !category || !photo) {
      toast.error("Complete all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("photo", photo);

    try {
      const response = await axios.post(
        "https://halal-bro-server.vercel.app/api/v2/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Product uploaded successfully!");
        handleClose(); // Close dialog
        setProductName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setPhoto(null);
      }
    } catch (error) {
      console.error("Failed to upload product", error);
      toast.error("Failed to upload product");
    }
  };

  useEffect(() => {
    const smMediaQuery = window.matchMedia("(max-width: 640px)");

    const handleScreenSizeChange = (e) => {
      if (e.matches) {
        setDisplayComponent(
          <Menu>
            <MenuHandler>
              <Avatar
                src={userInfo && userInfo.image}
                className="border-green-600 border-2 cursor-pointer"
                size="md"
              />
            </MenuHandler>
            <MenuList>
              <Link to="profile"><MenuItem>Profile</MenuItem></Link>
              <MenuItem onClick={handleOpen}>Upload</MenuItem>
              <Link to="products"><MenuItem>Products</MenuItem></Link>
             <Link to="order"> <MenuItem>Orders</MenuItem></Link>
              <MenuItem onClick={temp}>Logout</MenuItem>
            </MenuList>
          </Menu>
        );
      } else {
        setDisplayComponent(
          <>
            <h1
              onClick={handleOpen}
              className="text-white montserrat-alternates-light cursor-pointer hover:text-[green]"
            >
              Upload
            </h1>
            <Link to="products"><h1 className="text-white montserrat-alternates-light cursor-pointer hover:text-[green]">
              Products
            </h1></Link>
            <Link to="orders">
            <h1 className="text-white montserrat-alternates-light cursor-pointer hover:text-[green]">
              Orders
            </h1>
            </Link>
            {data ? (
              <Menu>
                <MenuHandler>
                  <Avatar
                    src={userInfo && userInfo.image}
                    className="border-green-600 border-2 cursor-pointer"
                    size="md"
                  />
                </MenuHandler>
                <MenuList>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem onClick={temp}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <div className="flex gap-2">
                <Button className="bg-green-500">Login</Button>
                <Button className="text-black bg-white">Signin</Button>
              </div>
            )}
          </>
        );
      }
    };

    handleScreenSizeChange(smMediaQuery);
    smMediaQuery.addEventListener("change", handleScreenSizeChange);

    return () => smMediaQuery.removeEventListener("change", handleScreenSizeChange);
  }, [data]);

  return (
    <div className="bg-gradient-to-r from-green-500 to-[#c9de71] w-full h-20 flex justify-between items-center px-6 shadow-lg rounded-lg">
     <Link to="/">
     <h1 className="flex gap-2 justify-center items-center text-white text-xl sm:text-2xl font-bold montserrat-alternates-bold">
        <img src="/logo/logo.jpg" className="w-14 rounded-full" alt="Logo" />
        HALAL-BRO
      </h1>
     </Link>
      <div className="flex items-center gap-6">{displayComponent}</div>
      <Dialog className="py-10" open={open} handler={handleClose}>
        <h1 className="flex justify-center items-center new-amsterdam-regular text-4xl heading">
          Upload Product
        </h1>
        <DialogBody>
          <div className="flex flex-col justify-center items-center gap-y-5">
            <div className="w-72">
              <Input
                type="text"
                label="Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="w-72">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              className="mt-1 block w-full h-32 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

            <div className="w-72">
              <Input
                type="number"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="w-72">
              <Select
                label="Select Category"
                value={category}
                onChange={(value) => setCategory(value)}
              >
                <Option value="Pant">Pant</Option>
                <Option value="Shirt">Shirt</Option>
                <Option value="T-Shirt">T-Shirt</Option>
                <Option value="Slipper">Slipper</Option>
              </Select>
            </div>
            <div className="w-72">
              <Input
                type="file"
                label="Photo"
                accept=".jpg,.png,.jpeg" // Correct file types
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center">
          <Button
            variant="text"
            color="red"
            onClick={handleClose} // Close dialog
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Upload</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
