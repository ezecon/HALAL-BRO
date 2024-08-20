import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function Verify() {
    const [verificationCode, setVerificationCode] = useState('');
    const [state, setState] = useState(null);
    const [code, setCode] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { userEmail } = location.state || {};

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (verificationCode === code) {
            try {
                
                const response = await axios.put('https://halal-bro-server.vercel.app/api/v2/auth/verify', { email: userEmail });
    
                if (response.data.error) {
                    toast.error(userEmail);
                    console.log(userEmail)
                } else {
                    toast.success("Verification successful!");

                    navigate('information', {
                        state: { userEmail: userEmail }
                      });
                    
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    toast.error(error.response.data.error);
                } else {
                    console.error('Error verification:', error);
                    toast.error("Verification failed. Please try again.");
                }
            }
        } else {
            toast.error("Wrong Code");
        }
    };
    

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`https://halal-bro-server.vercel.app/api/v2/auth/verify/${userEmail}`);
                if (response.status === 200) {
                    console.log("data fetched");
                    setState(response.data.isVerified);
                    setCode(response.data.verificationCode);
                    console.log("Email:",userEmail) // Assuming response.data contains verificationCode
                } else {
                    console.log("error");
                }
            } catch (error) {
                console.log("error", error);
            }
        };
    
        if (state === true) {
            toast.success("Verification Complete")
            navigate('information', {
                state: { userEmail: userEmail }
              });
            
        } else {
            fetch();
        }
    });
    
    

    return (
        <div className="relative min-h-screen bg-gradient-to-r from-green-500 to-[#c9de71]  montserrat-alternates-regular">
            <div className="relative flex flex-col items-center justify-center p-4 pt-36">
                <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg border border-gray-700 bg-opacity-10">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <input 
                                type="text" 
                                id="name"
                                placeholder="Verification Code" 
                                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-black placeholder-black"
                                aria-label="Verification Code"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full bg-black hover:bg-slate-900 text-white py-3 rounded-lg transition duration-300">
                            Verify
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
