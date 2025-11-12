import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import Modal from 'react-modal';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ listing }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(listing)
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show one card at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <>
    <>
  {listing && listing.length > 0 ? (
    <>
      {listing.map((res, index) => (
        <div key={index} className="border rounded-lg overflow-hidden shadow-sm cursor-pointer">
          <Link href={`/posts/${encodeURIComponent(res.id)}`}>
            <div className="relative w-full h-64">
              {/* Carousel Images */}
              <div className="relative w-full h-full">
                {res.images && res.images.length > 0 ? (
                  <Slider {...settings}>
                    {res.images.map((imgx, imgIndex) => (
                      <div key={imgIndex} className="relative w-full h-64 ">
                        <Image
                          src={imgx}
                          alt={`Slide ${imgIndex}`}
                          layout="fill" // Ensures the image fills the parent container
                          objectFit="cover" // Make sure the image covers the container
                          className="absolute inset-0 transition-opacity duration-500"
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <p>No images available</p>
                )}
              </div>
              {/* Wishlist Icon */}
              <div className="absolute top-2 right-2">
                <FaHeart
                  className="text-white bg-black bg-opacity-50 p-2 rounded-full"
                  size={24}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent Link navigation
                    openModal();
                  }}
                />
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg">{res.title}</h3>
              <p className="text-sm text-gray-500">Hosted by {res.host}</p>
              <p className="text-sm text-gray-500">
                {res.city}, {res.country}
              </p>
              <p className="text-sm font-semibold">{res.availability}</p>
            </div>
          </Link>
        </div>
      ))}
    </>
  ) : (
    <p>No items available</p>
  )}
</>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Wishlist Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="relative flex items-center p-4 border-b-4">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute left-2 text-2xl text-black p-1 z-50"
          >
            &times;
          </button>

          {/* Centered Text */}
          <p className="flex-1 text-center text-lg">Log in or sign up</p>
        </div>

        {/* Form for input */}
        <form className="space-y-4">
          {/* Country/Region Dropdown */}
          <h2 className="text-2xl font-bold mb-4 text-left p-4">Welcome to Higglers</h2>

          <div>
            <select name="country" className="w-full border p-2 rounded-md">
              <option value="+91">India (+91)</option>
              <option value="+1">USA (+1)</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Phone Number Input */}
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              className="w-full border p-2 rounded-md"
            />
          </div>

          {/* Continue Button */}
          <button type="submit" className="w-full bg-pink-500 text-white p-2 rounded-md text-center font-semibold">
            Continue
          </button>

          {/* Or separator */}
          <div className="text-center text-gray-500 my-4">or</div>

          {/* Social Buttons */}
          <button className="w-full border flex items-center justify-center p-2 rounded-md mb-2">
            <span>Continue with Facebook</span>
          </button>
          <button className="w-full border flex items-center justify-center p-2 rounded-md mb-2">
            <span>Continue with Google</span>
          </button>
          <button className="w-full border flex items-center justify-center p-2 rounded-md">
            <span>Continue with Apple</span>
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Carousel;
