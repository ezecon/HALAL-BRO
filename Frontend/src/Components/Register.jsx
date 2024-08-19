import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "./../services/authService";
import toast from "react-hot-toast";
import { Button, Input } from "@material-tailwind/react";
import { auth, provider } from './../firebase/firebase'; // Adjust path as necessary
import axios from "axios";
import { signInWithPopup } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";



const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken();
  
        // Send token to your backend
        const response = await axios.post('https://halal-bro-server.vercel.app/api/v2/auth/google-signin', {
            idToken,
        });
  
        // Handle successful login
        toast.success('Login successful');
        const { token, uid } = response.data;
        console.log("JWT Token:", token);
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('googleUid', uid);
        navigate("/");
  
    } catch (error) {
        console.error("Google login failed:", error);
        toast.error('Google login failed');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password, displayName);
      toast.success("Registered successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.msg || "Failed to register");
    }
  };

  return (

          <div className="pt-16 sm:pt-24 md:pt-32 lg:pt-56">
          <div className="flex flex-col sm:flex-row justify-center items-center">
              <div className="flex flex-col justify-center items-center w-96 h-96   p-4  profile-left-1">
                   <img src="logo/logo.jpg" className="w-14 rounded-full" alt="Logo" />
              <h1 className="text-2xl text-white mb-4 montserrat-alternates-bold">Halal Bro</h1>
                  <Link to="/login">
                  <Button className="bg-[#9b9b9b81] text-white hover:bg-[#7a7a7a]">
                      Login
                  </Button>
                  </Link>
              </div>
              <div className="w-96 h-96 border border-gray-300 p-6 sm:p-10 flex flex-col justify-center items-center gap-y-5">
                  <h1 className="text-lg sm:text-xl mb-4 montserrat-alternates-bold">Sign In</h1>
                  <form className="text-center flex flex-col justify-center items-center gap-y-4">
                      <div className="text-gray-500  w-72 max-w-xs sm:max-w-sm">
                          <Input
                              type="email"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="border text-gray-500  border-gray-300 rounded-md p-2 mb-4 w-full"
                          />
                      </div>
                      <div className="w-72 max-w-xs sm:max-w-sm">
                      <Input
                        type="text"
                        placeholder="Display Name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                         className="border text-gray-500  border-gray-300 rounded-md p-2 mb-4 w-full"

                      />
                    </div>
                    <div className="text-gray-500  w-72 max-w-xs sm:max-w-sm">
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                         className="border text-gray-500  border-gray-300 rounded-md p-2 mb-4 w-full"
     
                      />
                    </div>
                      <Button onClick={handleRegister} className=" mt-4">
                          Register
                      </Button>
                  </form>
                  <div className='flex flex-col justify-center items-center'>
                    <FcGoogle onClick={handleGoogleLogin} className='text-3xl'/>
                    <p className='montserrat-alternates-light  text-sm'>with google?</p>
                </div>
              </div>
          </div>
  </div>
  );
};

export default Register;
