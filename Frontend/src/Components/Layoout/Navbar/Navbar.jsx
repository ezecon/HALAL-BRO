import { Avatar,  Drawer, IconButton, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { CgDetailsMore } from "react-icons/cg";

export default function Navbar() {
  const [displayComponent, setDisplayComponent] = useState(null); // State to hold the rendered component
  const [openRight, setOpenRight] = useState(false)
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);
  useEffect(() => {
    const smMediaQuery = window.matchMedia('(max-width: 640px)');

    // Function to update the component based on the screen size
    const handleScreenSizeChange = (e) => {
      if (!e.matches) {
        // Small screen
        setDisplayComponent(
          <>
            <h1 className="text-white cursor-pointer hover:text-gray-300">Cart</h1>
            <h1 className="text-white cursor-pointer hover:text-gray-300">Products</h1>
            <h1 className="text-white cursor-pointer hover:text-gray-300">About</h1>
            <Menu>
            <MenuHandler>
                <Avatar src="/1.jpg" className=" border-green-600 border-2" size="md" />
            </MenuHandler>
            <MenuList>
              <MenuItem>Menu Item 1</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
              <MenuItem>Menu Item 3</MenuItem>
            </MenuList>
          </Menu>
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
  }, []);

  return (
    <div className="bg-[#fdfdfd33] w-full h-20 flex justify-between items-center px-6">
      <h1 className="flex gap-2 justify-center items-center text-white text-2xl font-bold montserrat-alternates-bold">
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
        <div className="flex flex-col montserrat-alternates-regular gap-y-4 h-full">
        <div className="flex gap-3 justify-center items-center text-[green]">
          <Menu>
            <MenuHandler>
              <Avatar src="/1.jpg" className="border-green-600 border-2" size="md" />
            </MenuHandler>
            <MenuList>
              <MenuItem>Menu Item 1</MenuItem>
              <MenuItem>Menu Item 2</MenuItem>
              <MenuItem>Menu Item 3</MenuItem>
            </MenuList>
          </Menu>
          <h1>Md. Econozzaman Econ</h1>
        </div>
        <div className="bg-[#cdcecd67] p-5 rounded-lg flex justify-between">
          <h1 className="text-[green] cursor-pointer hover:text-gray-300">Dashboard</h1>
          <h1 className="text-[green] cursor-pointer hover:text-gray-300">Logout</h1>
        </div>
        <h1 className="text-[green] cursor-pointer hover:text-gray-300">Cart</h1>
        <h1 className="text-[green] cursor-pointer hover:text-gray-300">Products</h1>
        <h1 className="text-[green] cursor-pointer hover:text-gray-300">About</h1>
        
      </div>


      </Drawer>
      </>
    </div>
  );
}
