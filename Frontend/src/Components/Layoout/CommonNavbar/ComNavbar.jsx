import { Avatar,  Button,  Drawer, IconButton, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CgDetailsMore } from "react-icons/cg";

export default function ComNavbar() {
  const [displayComponent, setDisplayComponent] = useState(null); // State to hold the rendered component
  const [data, setData] = useState(true)
  const [openRight, setOpenRight] = useState(false)
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);
const temp =()=>{
  setData(false)
}
  useEffect(() => {
    const smMediaQuery = window.matchMedia('(max-width: 640px)');

    // Function to update the component based on the screen size
    const handleScreenSizeChange = (e) => {
      if (!e.matches) {
        // Small screen
        setDisplayComponent(
          <>
            <h1 className="text-white montserrat-alternates-light cursor-pointer hover:text-[green]">Cart</h1>
            <h1 className="text-white montserrat-alternates-light cursor-pointer hover:text-[green]">Products</h1>
            <h1 className="text-white montserrat-alternates-light cursor-pointer hover:text-[green]">About</h1>
           {data ? (
           <>
            <Menu>
            <MenuHandler>
                <Avatar src="/1.jpg" className=" border-green-600 border-2 cursor-pointer" size="md" />
            </MenuHandler>
            <MenuList>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Dashboard</MenuItem>
              <MenuItem onClick={temp}>Logout</MenuItem>
            </MenuList>
          </Menu>
           </>) : (
            <>
            <div className="flex gap-2">
              <Button className="bg-green-500">Login</Button>
              <Button className="text-black bg-white">Signin</Button>

            </div>
            </>
           )
           }
          </>
        );
      } else {
        // Large screen
        setDisplayComponent(<CgDetailsMore onClick={openDrawerRight} className="text-white text-2xl"/>);
      }
    };

    // Check the initial screen size
    handleScreenSizeChange(smMediaQuery);

    // Listen for screen size changes
    smMediaQuery.addEventListener('change', handleScreenSizeChange);

    // Clean up the event listener on component unmount
    return () => smMediaQuery.removeEventListener('change', handleScreenSizeChange);
  });

  return (
    <div className="bg-[#68d86dd3] w-full h-20 flex justify-between items-center px-6">
      <h1 className="flex gap-2 justify-center items-center text-white text-xl sm:text-2xl font-bold montserrat-alternates-bold">
        <img src="logo/logo.jpg" className="w-14 rounded-full" alt="" />HALAL-BRO
      </h1>
      <div className="flex items-center gap-6">
        <div className="wrap-input-17">
          <div className="search-box">
            <button className="btn-search">
              <CiSearch className="text-3xl" />
            </button>
            <input
              type="text"
              className="input-search"
              placeholder="Type to Search..."
            />
          </div>
        </div>

        {displayComponent}
      </div>
    <>
    <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4"
      >
        <div className="mb-6 flex items-center justify-between">

          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerRight}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
       
          
          {data ? (
           <>
            <div className="flex flex-col montserrat-alternates-regular gap-y-4 h-full">
              <div className="flex gap-3 justify-center items-center text-[green]">
                <Avatar src="/1.jpg" className="border-green-600 border-2" size="md" />
                <h1>Md. Econozzaman Econ</h1>
                
              </div>
              <div className="bg-[#cdcecd67] p-5 rounded-lg flex justify-between">
                  <h1 className="text-[green] cursor-pointer hover:text-gray-300">Dashboard</h1>
                  <h1 onClick={temp}className="text-[green] cursor-pointer hover:text-gray-300">Logout</h1>
                </div>
              <h1 className="text-[green] cursor-pointer hover:text-gray-300">Cart</h1>
              <h1 className="text-[green] cursor-pointer hover:text-gray-300">Products</h1>
              <h1 className="text-[green] cursor-pointer hover:text-gray-300">About</h1>
            
          </div>
           </>) : (
            <>
            <div className=" flex justify-between px-10">
            <Button className="bg-green-500">Login</Button>
              <Button className="text-black bg-white">Signin</Button>


            </div>
            </>
           )}



      </Drawer>
      </>
    </div>
  );
}
