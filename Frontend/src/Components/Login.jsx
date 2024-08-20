import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';// Adjust path as necessary
import { Button, Input } from '@material-tailwind/react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleEmailPasswordLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/v2/auth-login', {
                email,
                password,
            }, { withCredentials: true }); // Include credentials in the request

            // Handle successful login
            toast.success('Login successful');
            navigate("/");

        } catch (error) {
            console.error("Email/Password login failed:", error);
            toast.error(error.response?.data?.msg || 'Login failed');
        }
    };

    return (
        <div className="pt-16 sm:pt-24 md:pt-32 lg:pt-56">
            <div className="flex flex-col sm:flex-row justify-center items-center">
                <div className="flex flex-col justify-center items-center w-96 h-96 p-4 profile-left-1">
                    <img src="logo/logo.jpg" className="w-14 rounded-full" alt="Logo" />
                    <h1 className="text-2xl text-white mb-4 montserrat-alternates-bold">Halal Bro</h1>
                    <Button className="bg-[#9b9b9b81] text-white hover:bg-[#7a7a7a]">
                        Signin
                    </Button>
                </div>
                <div className="w-96 h-96 border border-gray-300 p-6 sm:p-10 flex flex-col justify-center items-center gap-y-5">
                    <h1 className="text-lg sm:text-xl mb-4 montserrat-alternates-bold">Log In</h1>
                    <form className="text-center flex flex-col gap-y-4">
                        <div className="w-72 max-w-xs sm:max-w-sm">
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                            />
                        </div>
                        <div className="w-72 max-w-xs sm:max-w-sm">
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                            />
                        </div>
                        <Button onClick={handleEmailPasswordLogin} className="mt-4">
                            Login
                        </Button>
                    </form>
                   
                </div>
            </div>
        </div>
    );
};

export default Login;
