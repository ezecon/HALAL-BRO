import Footer from "../../Components/Footer/Footer";
import Gallery from "../../Components/Gallery/Gallery";
import HeroSection from "../../Components/HeroSection/HeroSection";
import Products from "../../Components/Products/Products";

export default function Home() {
  return (
    <div>
        <HeroSection/>
        <Products/>
        <Gallery/>
        <Footer/>
    </div>
  )
}
