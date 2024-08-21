import React, { useState } from 'react';
import { MdBrowserUpdated, MdDelete } from 'react-icons/md';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Button,
  Select,
  Option
} from '@material-tailwind/react'; // Assuming you are using Material Tailwind components

export default function ProductCard({ product }) {
  const [open, setOpen] = useState(false);
  const [productName, setProductName] = useState(product.name);
  const [description, setDescription] = useState(product.description || '');
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category || '');
  const [status, setStatus] = useState(product.status || '');
  const [photo, setPhoto] = useState(null);

  const cardClasses = "w-[160px] sm:w-[200px] p-4 rounded-lg shadow-lg bg-white transform hover:scale-105 transition-transform duration-300";
  const { _id, name, image } = product;

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`https://halal-bro-server.vercel.app/api/v2/products/${id}`);
      if (res.status === 200) {
        toast.success("Product Deleted!");
      }
    } catch (error) {
      toast.error("Failed to delete product.");
      console.error(error);
    }
  };

  const handleOpen = () => setOpen(!open);
  
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('status', status);
    if (photo) {
      formData.append('image', photo);
    }

    try {
      const res = await axios.put(`https://halal-bro-server.vercel.app/api/v2/products/${_id}`, formData);
      if (res.status === 200) {
        toast.success("Product Updated!");
        setOpen(false); // Close the dialog after successful update
      }
    } catch (error) {
      toast.error("Failed to update product.");
      console.error("Error updating product:", error.response ? error.response.data : error);
    }
    
  };

  return (
    <div className="flex flex-col justify-center items-center hero-loop">
      <div className={cardClasses}>
        <img 
          src={image} 
          alt={`Image of ${name}`} 
          className="w-full h-40 object-cover rounded-md mb-4 transform transition-transform duration-1000 hover:scale-110"
        />
        <h3 className="new-amsterdam-regular text-xl font-semibold mt-2 hover:text-[goldenrod]">{name}</h3>
        <p className="new-amsterdam-regular text-lg text-gray-600">${price}</p>
        <div className="flex gap-2 justify-center">
          <a
            onClick={handleOpen}
            className="bg-[#e4e3e3] cursor-pointer text-white inline-block py-3 px-6 rounded-full shadow-lg font-semibold transition-transform duration-300 hover:bg-[goldenrod] hover:scale-105"
          >
            <MdBrowserUpdated className="text-black" />
          </a>
          <a
            onClick={() => handleDelete(_id)}
            className="bg-[#e4e3e3] cursor-pointer text-white inline-block py-3 px-6 rounded-full shadow-lg font-semibold transition-transform duration-300 hover:bg-[goldenrod] hover:scale-105"
          >
            <MdDelete className="text-black" />
          </a>
        </div>
      </div>

      {/* Dialog for updating the product */}
      <Dialog className="py-10" open={open} handler={handleOpen}>
        <h1 className="flex justify-center items-center new-amsterdam-regular text-4xl heading">
          Update Product
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
              <Select
                label="Select Status"
                value={status}
                onChange={(value) => setStatus(value)}
              >
                <Option value="Available">Available</Option>
                <Option value="Unavailable">Unavailable</Option>

              </Select>
            </div>
            <div className="w-72">
              <Input
                type="file"
                label="Photo"
                accept=".jpg,.png,.jpeg"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center">
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleSubmit}>
            <span>Update</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
