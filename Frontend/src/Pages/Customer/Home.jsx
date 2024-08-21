import { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Gallery from "../../Components/Gallery/Gallery";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Products from "../../Components/Products/Products";
import Outfit from "../../Components/Outfit/Outfit";
import WhyUs from "../../Components/WhyUs/WhyUs";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black gap-y-4">
       <span className="loader"></span>
       <div className="text-animation-container">
          <h1 className="text-animation">
            <span className="word">H</span>
            <span className="word">A</span>
            <span className="word">L</span>
            <span className="word">A</span>
            <span className="word">L</span>
            <span className="word"> </span>
            <span className="word">B</span>
            <span className="word">R</span>
            <span className="word">O</span>
          </h1>
        </div>
        <img src="logo/logo.jpg" className="w-14 rounded-full" alt="" />
      </div>
    );
  }
  return (
    <div>
        <HeroSection/>
        <Outfit/>
        <Products isHome/>
        <Gallery/>
        <WhyUs/>
        <Footer/>
    </div>
  )
}
