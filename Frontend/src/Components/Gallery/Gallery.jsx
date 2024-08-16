export default function Gallery() {
  return (
    <div className="my-24 autoShow">
      <h1 className="checkcursor heading new-amsterdam-regular text-6xl text-center">
        Gallery
      </h1>

      <div className="gap-3 relative w-full h-[500px] flex justify-center image-slider items-center">
        <div className="slider-wrapper">
          <img src="1_.jpg" alt="Image 1" className="slider-image"/>
          <img src="2.jpg" alt="Image 2" className="slider-image"/>
          <img src="3.jpg" alt="Image 3" className="slider-image"/>
          <img src="4.jpg" alt="Image 4" className="slider-image"/>
          <img src="5.jpg" alt="Image 5" className="slider-image"/>
          <img src="6.jpg" alt="Image 6" className="slider-image"/>
          <img src="7.jpg" alt="Image 7" className="slider-image"/>
          <img src="8.jpg" alt="Image 8" className="slider-image"/>
          <img src="9.jpg" alt="Image 9" className="slider-image"/>
          <img src="10.jpg" alt="Image 10" className="slider-image"/>
          <img src="11.jpg" alt="Image 11" className="slider-image"/>
          <img src="12.jpg" alt="Image 12" className="slider-image"/>
          <img src="13.jpg" alt="Image 13" className="slider-image"/>
          
          {/* Duplicate images for seamless looping */}
          <img src="1_.jpg" alt="Image 1" className="slider-image"/>
          <img src="2.jpg" alt="Image 2" className="slider-image"/>
          <img src="3.jpg" alt="Image 3" className="slider-image"/>
          <img src="4.jpg" alt="Image 4" className="slider-image"/>
          <img src="5.jpg" alt="Image 5" className="slider-image"/>
          <img src="6.jpg" alt="Image 6" className="slider-image"/>
          <img src="7.jpg" alt="Image 7" className="slider-image"/>
          <img src="8.jpg" alt="Image 8" className="slider-image"/>
          <img src="9.jpg" alt="Image 9" className="slider-image"/>
          <img src="10.jpg" alt="Image 10" className="slider-image"/>
          <img src="11.jpg" alt="Image 11" className="slider-image"/>
          <img src="12.jpg" alt="Image 12" className="slider-image"/>
          <img src="13.jpg" alt="Image 13" className="slider-image"/>
        </div>
      </div>
    </div>
  )
}
