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
      if (!e.matches) {
        setDisplayComponent(
          <Menu>
            <MenuHandler>
              <Avatar
                src="/1.jpg"
                className="border-green-600 border-2 cursor-pointer"
                size="md"
              />
            </MenuHandler>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem onClick={handleOpen}>Upload</MenuItem>
              <MenuItem>Products</MenuItem>
              <MenuItem>About</MenuItem>
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
            <h1 className="text-white montserrat-alternates-light cursor-pointer hover:text-[green]">
              Products
            </h1>
            <h1 className="text-white montserrat-alternates-light cursor-pointer hover:text-[green]">
              About
            </h1>
            {data ? (
              <Menu>
                <MenuHandler>
                  <Avatar
                    src="/1.jpg"
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
    <div className="bg-[#34b43ac2] w-full h-20 flex justify-between items-center px-6 shadow-lg rounded-lg">
      <h1 className="flex gap-2 justify-center items-center text-white text-xl sm:text-2xl font-bold montserrat-alternates-bold">
        <img src="logo/logo.jpg" className="w-14 rounded-full" alt="Logo" />
        HALAL-BRO
      </h1>
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
              <Input
                type="text"
                label="Description"
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
