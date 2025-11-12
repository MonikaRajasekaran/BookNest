import { useRouter } from 'next/router';
import Image from 'next/image';
import { listings } from '@@/data/listing';
import { useState } from 'react';
import Header from '@/components/header';
import RoomDetails from '@/components/RoomDetails';
import Structure from '@/layout/basic';
const Post = ({onClose}) => {
  const router = useRouter(); 
  const { id } = router.query;
  const packageList = listings.find((item) => item.id == id);

  if (!packageList) {
    return <p>Package not found</p>;
  }

  const { title, host, availability, images, city, country } = packageList;

  // State for carousel
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openCarousel = (index) => {
    setCurrentImageIndex(index);
    setIsCarouselOpen(true);
  };

  const closeCarousel = () => {
    setIsCarouselOpen(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Structure>
   
     <div className='container-fluid'>
     <div className="bg-gray-50  p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">{title}</h1>

          <div className="mt-8">
            {images && images.length > 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {/* First Column: One Large Image */}
                <div
                  className="relative cursor-pointer"
                  onClick={() => openCarousel(0)}
                >
                  <Image
                    src={images[0]}
                    alt="Main Image"
                    width={600}
                    height={400}
                    layout="responsive"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>

                {/* Second Column: 4 Smaller Images in 2x2 Grid */}
                <div className="grid grid-cols-2 grid-rows-2 gap-2">
                  {images.slice(1, 5).map((img, index) => (
                    <div
                      key={index}
                      className="relative cursor-pointer"
                      onClick={() => openCarousel(index + 1)}
                    >
                      <Image
                        src={img}
                        alt={`Image ${index + 2}`}
                        width={300}
                        height={300}
                        layout="responsive"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>No images available</p>
            )}
          </div>

          {/* Carousel Modal */}
          {isCarouselOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="relative w-full max-w-3xl mx-4">
                <Image
                  src={images[currentImageIndex]}
                  alt={`Carousel Image ${currentImageIndex + 1}`}
                  width={1200}
                  height={800}
                  layout="responsive"
                  objectFit="contain"
                  className="rounded-lg"
                />

                {/* Prev and Next Buttons */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  &#8249;
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  &#8250;
                </button>

                {/* Close Button */}
                <button
                  onClick={closeCarousel}
                  className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full"
                >
                  &times;
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 text-white text-sm bg-black bg-opacity-50 py-1 px-2 rounded-lg">
                  {`${currentImageIndex + 1} / ${images.length}`}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
     </div>

      <RoomDetails details={packageList}  />
    </Structure>
  );
};

export default Post;
