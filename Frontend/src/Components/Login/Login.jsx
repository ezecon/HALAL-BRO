import { FaFontAwesome } from "react-icons/fa";
import { SocialIcon } from "react-social-icons";


const Login = () => {
    return (
     <div className="bg-gradient-to-r from-green-500 to-[yellow] max-h-screen">
        <div className="flex max-h-screen mx-24 my-10 py-20 px-24 border-gray-300 rounded-lg">
        <div
          className="w-1/2 bg-cover bg-center"
          >
        
        <div
  className="flex flex-col justify-center items-center h-full bg-black bg-opacity-50 text-white p-8 rounded-l-2xl bg-cover bg-center"
  style={{ backgroundImage: "url('/src/assets/455370182_1169643994262451_2130364659839956985_n.jpg')" }}
>
  <h1 className="text-4xl font-bold text-teal-900">Halal Clothing</h1>
  <p className="mt-4 text-lg text-center">
    Smartness is rely on your fashion senses
  </p>
</div>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8 rounded-r-2xl">
          <h1 className="text-6xl font-bold text-lime-300">Welcome</h1>
          <p className="mt-2 text-zinc-300 text-sm">Login with Email</p>
          <form className="w-80 mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-zinc-700" htmlFor="email">
                Email id
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full h-10 border-2 border-light-green-700 outline-4 outline-green-800 rounded-md  "
                placeholder="thisisux@mail.com"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-zinc-700" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 block w-full h-10 border-2 border-light-green-700 outline-4 outline-green-800 rounded-md "
                required
              />
            </div>
            <div className="flex items-center mt-4 ml-24">
              <a href="#" className="text-xs hover:underline">
                Forgot your password?
              </a>
            </div>
            <div className="w-full flex justify-center mt-2">
  <button
    type="submit"
    className="w-20 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-400"
  >
    LOGIN
  </button>
</div>
            
            
            
          </form>
          <p className="mt-4 text-sm text-zinc-600">
            Don't have an account? <a href="#" className="text-blue-500 hover:underline">Register Now</a>
          </p>
        </div>
      </div>
     </div>
    );
  };
  
  export default Login;