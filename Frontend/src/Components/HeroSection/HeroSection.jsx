import Navbar from "../Layoout/Navbar/Navbar";


export default function HeroSection() {
  return (
    <div
      className="w-full min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('1.jpg')" }}
    >
      <Navbar />
      <div className="flex-1 flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-screen-xl mx-auto">
          <div className="text-white py-10 flex flex-col justify-center items-center md:items-start">
            <h1 className="hover:scale-125 duration-200 new-amsterdam-regular text-5xl md:text-6xl p-5 text-center md:text-left">
              HALAL-BRO: Your Go-To Online Store
            </h1>
            <p className="hover:scale-125 duration-200 grey-qo-regular text-2xl md:text-3xl text-center md:text-left px-5">
              ShopEase offers a seamless shopping experience with a curated selection of quality products.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <div className="hero-loop">
              <img
                className="w-full max-w-xs md:max-w-sm lg:max-w-md hover:rotate-45 duration-200 hover:scale-150"
                src="shoes3.png"
                alt="Shoes"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
