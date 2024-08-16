

export default function ProductCard({product}) {
  const {_id, name, price, image} = product
  return (
    <div>
        <div className="w-[320px] h-[450px] bg-[rgba(112,96,96,0.2)] shadow-lg border border-[rgba(255,255,255,0.25)] border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] rounded-[25px] backdrop-blur-sm p-10 flex flex-col justify-between items-center">
          <h1 className="tracking-widest text-white new-amsterdam-regular text-3xl">{name}</h1>
          <img src={image} alt="Slipper" className="w-full hero-loop rounded" />
          <p className="tracking-widest text-white new-amsterdam-regular text-2xl">{price}$</p>
          <a
          href="#"
          className="absolute bottom-[-20px] bg-white inline-block no-underline py-3 px-6 rounded-full shadow-md font-medium text-[#1e6b7b] transition-all duration-200 hover:tracking-widest"
        >
          Add to Cart
        </a>
        </div>
    </div>
  )
}
