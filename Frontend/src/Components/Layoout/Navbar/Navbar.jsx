import { Avatar } from "@material-tailwind/react";
import { CiSearch } from "react-icons/ci";
export default function Navbar() {
  return (
    <div className="bg-[#fdfdfd33] w-full h-20 flex justify-between items-center px-6">
      <h1 className="text-white text-2xl font-bold montserrat-alternates-bold">
        HALAL-BRO
      </h1>
      <div className="flex items-center gap-6">
        <div className="wrap-input-17">
            <div className="search-box">
                <button className="btn-search"><CiSearch className="text-3xl"/></button>
                <input type="text" className="input-search" placeholder="Type to Search..."/>
                </div>
        </div>

        <h1 className="text-white cursor-pointer hover:text-gray-300">Cart</h1>
        <h1 className="text-white cursor-pointer hover:text-gray-300">Products</h1>
        <h1 className="text-white cursor-pointer hover:text-gray-300">About</h1>
        <Avatar src="/1.jpg" size="sm" />
      </div>
    </div>
  );
}
