import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button, Input } from "@material-tailwind/react";
import emailjs from 'emailjs-com';
import axios from "axios";


const Register = () => {
  const [name, setDisplayName] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  

  const getRandomChoice = () => {
    const minimum = 100000;
    const maximum = 999999;
    const randomIndex = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    return randomIndex;
};

const handleSignUp = (code) => {
  emailjs.send(
    'service_cg57hsm',
    'template_912hg7n',
    {
      message: code,
      user_email: email,
      user_name: name,
    },
    'HPOXU5yUUILTLU-HM'
  )
  .then((response) => {
    
    toast.success("Message Sent!");
    console.log('Email sent successfully!', response.status, response.text);
  })
  .catch((err) => {
    console.error('Failed to send email. Error:', err);
  });
  navigate('/verify', {
    state: { userEmail: email }
  });


};

const handleSubmit = async (event) => {
    event.preventDefault();
    const code = getRandomChoice();
    const newUser = {
      name: name,
      email: email,
      number:number,
      password: password,
      verificationCode: code,
    }; 
  
    try {
      const response = await axios.post(`http://localhost:3000/api/v2/auth/register`, newUser);
      
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Registration successful!");
      } 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        console.error('Error registering:', error);
        toast.error("Registration failed. Please try again.");
      }
    }
    handleSignUp(code);
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
                  <div className="w-72 max-w-xs sm:max-w-sm">
                      <Input
                        type="text"
                        placeholder="Display Name"
                        value={name}
                        onChange={(e) => setDisplayName(e.target.value)}
                         className="border text-gray-500  border-gray-300 rounded-md p-2 mb-4 w-full"

                      />
                    </div>
                    <div className="w-72 max-w-xs sm:max-w-sm">
                      <Input
                        type="text"
                        placeholder="Display Name"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                         className="border text-gray-500  border-gray-300 rounded-md p-2 mb-4 w-full"

                      />
                    </div>
                      <div className="text-gray-500  w-72 max-w-xs sm:max-w-sm">
                          <Input
                              type="email"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
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
                      <Button onClick={handleSubmit} className=" mt-4">
                          Register
                      </Button>
                  </form>
  
              </div>
          </div>
  </div>
  );
};

export default Register;
