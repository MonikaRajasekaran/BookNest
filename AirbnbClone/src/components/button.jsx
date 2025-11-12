import React, { useState } from "react";
import { useRouter } from "next/router";
import { IconDetail } from "../../public/data/buttonIcon";
import Image from "next/image";

function ButtonIcon() {
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleIconClick = (category) => {
    router.push(`/detail/${category}`);
  };

  const scrollLeft = () => {
    const container = document.getElementById("iconScrollContainer");
    container.scrollBy({ left: -200, behavior: "smooth" });
    setScrollPosition(container.scrollLeft - 200);
  };

  const scrollRight = () => {
    const container = document.getElementById("iconScrollContainer");
    container.scrollBy({ left: 200, behavior: "smooth" });
    setScrollPosition(container.scrollLeft + 200);
  };

  return (
    <div className="relative w-full">
      {/* Left Scroll Button */}
     {/* Left Scroll Button */}
<button
  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border text-3xl w-10 h-10 rounded-full z-10 flex items-center justify-center"
  onClick={scrollLeft} // Replace with your scrollLeft function
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m0 0l4-4m-4 4l4 4" />
  </svg>
</button>


      {/* Icon Scrollable Container */}
      <div
        id="iconScrollContainer"
        className="flex overflow-x-auto hide-scrollbar space-x-6 pl-12 pr-12"
      >
        {IconDetail && IconDetail.length > 0 ? (
          IconDetail.map((res, index) => (
            <a
              key={index}
              href="#"
              className="flex flex-col items-center justify-center min-w-[80px] text-center"
              onClick={() => handleIconClick(res.name)}
            >
              <Image src={res.icon} width={30} height={30} alt={res.name} />
              <span className="text-sm md:text-md">{res.name}</span>
            </a>
          ))
        ) : (
          <p>No icons available</p>
        )}
      </div>

      {/* Right Scroll Button */}
<button
  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border text-3xl w-10 h-10 rounded-full z-10 flex items-center justify-center"
  onClick={scrollRight}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h8m0 0l-4-4m4 4l-4 4" />
  </svg>
</button>

    </div>
  );
}

export default ButtonIcon;
