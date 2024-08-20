

export default function Gallery() {
  const images = [
    { id: 1, src: '1_.jpg', alt: 'Image 1' },
    { id: 2, src: '2.jpg', alt: 'Image 2' },
    { id: 3, src: '3.jpg', alt: 'Image 3' },
    { id: 4, src: '4.jpg', alt: 'Image 4' },
    { id: 5, src: '5.jpg', alt: 'Image 5' },
    { id: 6, src: '6.jpg', alt: 'Image 6' },
    { id: 7, src: '7.jpg', alt: 'Image 7' },
    { id: 8, src: '8.jpg', alt: 'Image 8' },
    { id: 7, src: '9.jpg', alt: 'Image 7' },
    { id: 8, src: '10.jpg', alt: 'Image 8' }
  ];
  return (
    <div className="my-24">
      <h1 className="checkcursor heading new-amsterdam-regular text-6xl text-center mb-8">
        Gallery
      </h1>
      <div className="gallery-body flex justify-center items-center gap-6">
     <div className="gallery">
      {images.map((image, index) => (
        <span key={image.id} style={{ '--i': index + 1 }}>
          <img src={image.src} alt={image.alt} />
        </span>
      ))}
    </div>
     </div>
    </div>
  );
}
