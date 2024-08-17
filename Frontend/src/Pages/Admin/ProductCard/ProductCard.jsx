import { FaOpencart } from "react-icons/fa";
export default function ProductCard({ product }) {
  const cardClasses = "p-4 rounded-lg shadow-lg bg- transform hover:scale-105 transition-transform duration-300";
  const {_id, name, price, image} = product;

  return (
    <div className="flex flex-col justify-center items-center p-4 hero-loop">
      <div className={cardClasses}>
        <img 
          src={image} 
          alt={`Image of ${name}`} 
          className="w-full h-40 object-cover rounded-md mb-4 transform transition-transform duration-1000 hover:scale-110"
        />
        <h3 className="new-amsterdam-regular text-xl font-semibold mt-2 hover:text-[goldenrod]">{name}</h3>
        <p className="text-gray-600">${price}</p>
        <div className="flex justify-center">
        <a
          href="#"
          className="bg-[#e4e3e3] text-white inline-block py-3 px-6 rounded-full shadow-lg font-semibold transition-transform duration-300 hover:bg-[goldenrod] hover:scale-105"
        >
          <FaOpencart className="text-black"/>
        </a>
        </div>
      </div>
    </div>
  );
}
