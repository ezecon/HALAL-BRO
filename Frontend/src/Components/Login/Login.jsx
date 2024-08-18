

const Login = () => {
    return (
     <div className="bg-gradient-to-r from-green-500 to-[yellow] max-h-screen">
        <div className="flex max-h-screen mx-24 my-10 py-14 px-24 border-gray-300 rounded-lg">
        <div
          className="w-1/2 bg-cover bg-center"
          
        >
          <div className="flex flex-col justify-center items-center h-full bg-black bg-opacity-50 text-white p-8 rounded-l-2xl">
            <h1 className="text-4xl font-bold">Halal Clothing</h1>
            <p className="mt-4 text-lg text-center">
              Smartness is rely on your fashion senses
            </p>
          </div>
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8 rounded-r-2xl">
          <h1 className="text-6xl font-bold text-blue-500">Welcome</h1>
          <p className="mt-2 text-zinc-300 text-sm">Login with Email</p>
          <form className="w-80 mt-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-zinc-700" htmlFor="email">
                Email id
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full h-8 border border-zinc-300 rounded-md shadow-sm "
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
                className="mt-1 block w-full h-8 border border-zinc-300 rounded-md shadow-sm "
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
            
            <div className="flex items-center justify-center mt-6">
              <span className="text-zinc-600">OR</span>
            </div>
            <div className="flex justify-around mt-4">
              <button className="p-2 border border-zinc-300 rounded-lg hover:bg-zinc-100">Google</button>
              <button className="p-2 border border-zinc-300 rounded-lg hover:bg-zinc-100">Facebook</button>
              <button className="p-2 border border-zinc-300 rounded-lg hover:bg-zinc-100">Apple</button>
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