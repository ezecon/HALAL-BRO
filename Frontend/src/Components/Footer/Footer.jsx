import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-black w-full p-6 md:p-10">
      <div className="flex flex-col md:flex-row items-center justify-around">
        <div className="text-center md:text-left mb-4 md:mb-0 hero-left-1">
          <h1 className="text-white font-bold text-4xl">HALAL BRO</h1>
         <div className="flex justify-center py-3"> <img src="logo/logo.jpg" className="w-14 rounded-full" alt="Logo" /></div>
          <div className="flex justify-center md:justify-start gap-4 mt-2">
            <p className="text-white montserrat-alternates-light gradient">About</p>
            <p className="text-white montserrat-alternates-light gradient">Contact</p>
            <p className="text-white montserrat-alternates-light gradient">Address</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3  autoShow">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.974846815392!2d91.18006207598292!3d23.46137177886871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37547f03755c1bd5%3A0xfbac0e32109b29ec!2sHalal%20Brothers!5e0!3m2!1sen!2sbd!4v1723728029976!5m2!1sen!2sbd"
            className="w-full h-48 md:h-64 rounded-md shadow-lg"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div className="mt-6 flex justify-center items-center gap-6 text-3xl text-[goldenrod]">
        <a  href="https://www.facebook.com/econozzaman.econ"><FaFacebook /></a>
        <a href="https://www.instagram.com/ez_econ"><FaInstagram /></a>
      </div>
    </div>
  );
}
