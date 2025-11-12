import React, { useState } from 'react';
import Link from 'next/link';
import { FaHeart,FaChevronLeft,FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import PropTypes from 'prop-types';

export default function CategorySlider({ products = [], mycategory }) {
  const [swiperRef, setSwiperRef] = useState(null);

  const filteredListings = products.filter(listing =>
    Array.isArray(listing.category) &&
    listing.category.some(categories =>
      categories.includes(mycategory)
    )
  );

  // Custom function to navigate to the next slide
  const handleNext = () => {
    if (swiperRef) {
      swiperRef.slideNext();
    }
  };

  // Custom function to navigate to the previous slide
  const handlePrev = () => {
    if (swiperRef) {
      swiperRef.slidePrev();
    }
  };
  

  return (
    <div className="swipercontainer mx-auto p-4 relative">
      <h1 className="text-3xl font-bold mb-6">Guest Favourite</h1>
      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={20}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {filteredListings.length > 0 ? (
          filteredListings.map((res, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center h-40">
              <div className="border rounded-lg overflow-hidden shadow-sm cursor-pointer">
                <Link href={`/posts/${encodeURIComponent(res.id)}`}>
                <div className="swiper-container relative group"> {/* Container for hover effect */}
  <Swiper
    slidesPerView={1}
    navigation={true} // Enable navigation
    modules={[Pagination, Navigation]}
    className="innerSwiper"
    
  >
    {res.images && res.images.length > 0 ? (
      res.images.map((imgx, imgIndex) => (
        <SwiperSlide key={imgIndex}>
          <div className="relative w-full h-64">
            <Image
              src={imgx}
              alt={`Slide ${imgIndex}`}
              layout="fill"
              objectFit="cover"
              className="absolute inset-0 transition-opacity duration-500"
            />
          </div>
        </SwiperSlide>
      ))
    ) : (
      <p>No images available</p>
    )}
  </Swiper>
</div>

                  <div className="p-4">
                    <h3 className="text-lg">{res.title}</h3>
                    <p className="text-sm text-gray-500">Hosted by {res.host}</p>
                    <p className="text-sm text-gray-500">{res.city}, {res.country}</p>
                    <p className="text-sm font-semibold">{res.availability}</p>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <p>No items available</p>
        )}
      </Swiper>
  
      {/* Custom navigation buttons */}
      <div className="swiper-button-next-custom1" onClick={handleNext}>
      <FaChevronRight size={20} />
      </div>
      <div className="swiper-button-prev-custom2" onClick={handlePrev}>
      <FaChevronLeft size={20} />
      </div>
    </div>
  );
}

// PropTypes for validation
CategorySlider.propTypes = {
  products: PropTypes.array.isRequired,
  mycategory: PropTypes.string.isRequired,
};
