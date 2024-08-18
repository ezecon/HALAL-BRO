import { Button } from "@material-tailwind/react";
import Navbar from "../Layoout/Navbar/Navbar";

export default function Profile() {
  return (
   <div className="profile-left">
    <Navbar/>
     <div className="profile-left grid grid-cols-1 sm:grid-cols-2 gap-6 p-10 lg:px-36">
      <div className="flex justify-center items-center">
        <img className="rounded-full w-3/4 sm:w-2/3 lg:w-1/2" src="/logo/logo.jpg" alt="Profile Logo" />
      </div>
      <div className="bg-white rounded-xl w-full h-full flex flex-col justify-center items-center text-center">
        <img className="w-36 rounded-xl hero-loop mb-5" src="/2.jpg" alt="Profile Picture" />
        <h1 className="text-2xl font-bold mb-3 montserrat-alternates-bold">Md. Econozzaman Econ</h1>
        <div className="text-left text-md text-gray-600 space-y-2 montserrat-alternates-regular">
          <p>Address:</p>
          <p>Number:</p>
          <p>Email:</p>
          <p>District:</p>
          <p>Account Created:</p>
        </div>
        <Button className="my-5">Update</Button>
      </div>
    </div>
   </div>
  );
}
