import { LuBadgeCheck } from "react-icons/lu";

export default function WhyUs() {
  return (
    <div className="p-4 pb-10">
       <h1 className="heading new-amsterdam-regular text-4xl sm:text-5xl md:text-6xl text-center m-10">
          Why Us
        </h1>
      <div className="grid gap-4 montserrat-alternates-extralight my-5 grid-cols-1 sm:grid-cols-2 px-10">
        <div className="shadow-lg rounded-lg px-4 py-6 flex flex-col items-center text-center md:text-left md:items-start transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex gap-3">
            <h2 className="font-bold text-[goldenrod] mt-2 flex gap-1"><LuBadgeCheck className="text-xl text-[goldenrod]" />Curated Collection</h2>
          </div>
          <p className="mt-2">
            <ol>
              <li>Handpicked, high-quality fabrics and trendy designs for every occasion</li>
            </ol>
          </p>

        </div>
           <div className="shadow-lg rounded-lg px-4 py-6 flex flex-col items-center text-center md:text-left md:items-start transition-transform duration-300 hover:scale-105 hover:shadow-xl">
          <div className="flex gap-3">
            <h2 className="font-bold text-[goldenrod] mt-2 flex gap-1"><LuBadgeCheck className="text-xl text-[goldenrod]" />Exceptional Service</h2>
          </div>
          <p className="mt-2">
            <ol>
              <li>Personalized shopping experience with fast delivery and hassle-free returns.</li>
            </ol>
          </p>

        </div>
      </div>
    </div>
  );
}
