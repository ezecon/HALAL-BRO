export default function Gallery() {
  const images = [
    '1_.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', 
    '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', 
    
  ];

  // Duplicated images array for continuous scrolling
  const allImages = [...images, ...images];

  return (
    <div className="my-24 autoShow py-10">
      <h1 className="checkcursor heading new-amsterdam-regular text-6xl text-center mb-8">
        Gallery
      </h1>
      <div className=" slider">
        <div className="slider-track">
          {allImages.map((image, index) => (
            <div className="slide" key={index}>
              <img src={image} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
