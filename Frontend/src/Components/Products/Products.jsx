import { Button } from "@material-tailwind/react";

export default function Products() {
  return (
    <div className="flex flex-col items-center autoShow">
      <h1 className="heading new-amsterdam-regular text-6xl text-center m-10 ">
        PRODUCTS
      </h1>
      <div
        className="gap-3 relative w-full h-[500px] py-5 flex justify-center items-center"
        
      >
        <div className="w-[350px] h-full bg-[rgba(112,96,96,0.2)] shadow-lg border border-[rgba(255,255,255,0.25)] border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] rounded-[25px] backdrop-blur-sm p-10 flex flex-col justify-between items-center">
          <h1 className="tracking-widest text-white new-amsterdam-regular text-3xl">Slipper</h1>
          <img src="/shoes3.png" alt="Slipper" className="w-full hero-loop rounded" />
          <p className="tracking-widest text-white new-amsterdam-regular text-2xl">12$</p>
          <a
          href="#"
          className="absolute bottom-[-20px] bg-white inline-block no-underline py-3 px-6 rounded-full shadow-md font-medium text-[#1e6b7b] transition-all duration-200 hover:tracking-widest"
        >
          Add to Cart
        </a>
        </div>
       
      </div>

      <div className="flex justify-center mt-5">
        <Button>See More</Button>
      </div>
    </div>
  );
}
