"use client";

import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Generate default cards data
const generateCards = (count: number) => {
  const categories = [
    {
      title: "Space Exploration",
      description: "Discover the cosmos",
      random: 1,
    },
    {
      title: "Earth Sciences",
      description: "Protecting our planet",
      random: 2,
    },
    {
      title: "Innovation Hub",
      description: "Building the future",
      random: 3,
    },
    {
      title: "Global Collaboration",
      description: "Working together",
      random: 4,
    },
    {
      title: "Data Solutions",
      description: "Insights from space",
      random: 5,
    },
  ];

  return Array.from({ length: count }, (_, index) => {
    const category = categories[index % categories.length];
    return {
      imageSrc: `https://picsum.photos/280/350?random=${
        category.random + index
      }`,
      captionText: category.title,
      altText: `${category.title.toLowerCase()} image`,
      overlayContent: (
        <div className="p-4 bg-black/60 text-white rounded-lg backdrop-blur-sm">
          <h3 className="font-bold">{category.title}</h3>
          <p className="text-sm mt-1">{category.description}</p>
        </div>
      ),
    };
  });
};

// TiltedCard Component
export function TiltedCard({
  imageSrc = "",
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "250px",
  imageHeight = "300px",
  imageWidth = "250px",
  scaleOnHover = 1.05,
  rotateAmplitude = 12,
  showTooltip = true,
  overlayContent = null as React.ReactNode | null,
  displayOverlayContent = false,
  isActive = false, // Add this prop
}) {
  const ref = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });
  const [tooltip, setTooltip] = useState({
    x: 0,
    y: 0,
    opacity: 0,
    rotate: 0,
  });
  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    setTransform((prev) => ({
      ...prev,
      rotateX: rotationX,
      rotateY: rotationY,
    }));

    const velocityY = offsetY - lastY;
    setTooltip((prev) => ({
      ...prev,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      rotate: -velocityY * 0.6,
    }));
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    setTransform((prev) => ({
      ...prev,
      scale: scaleOnHover,
    }));
    setTooltip((prev) => ({
      ...prev,
      opacity: 1,
    }));
  }

  function handleMouseLeave() {
    setTransform({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });
    setTooltip({
      x: 0,
      y: 0,
      opacity: 0,
      rotate: 0,
    });
  }

  return (
    <figure
      ref={ref}
      className={`relative flex flex-col items-center justify-center flex-shrink-0 transition-all duration-300`}
      style={{
        height: containerHeight,
        width: containerWidth,
        perspective: "800px",
        filter: isActive ? "blur(0)" : "blur(4px) brightness(0.7)",
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative transition-transform duration-150 ease-out"
        style={{
          width: imageWidth,
          height: imageHeight,
          transformStyle: "preserve-3d",
          transform: `rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
        }}
      >
        <img
          src={imageSrc}
          alt={altText}
          className="absolute top-0 left-0 object-cover rounded-2xl will-change-transform border border-gray-200 shadow-lg"
          style={{
            width: imageWidth,
            height: imageHeight,
            transform: "translateZ(0)",
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            if (e.currentTarget.nextElementSibling) {
              (
                e.currentTarget.nextElementSibling as HTMLElement
              ).style.display = "flex";
            }
          }}
        />
        <div
          className="absolute top-0 left-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex flex-col items-center justify-center text-white font-bold text-lg shadow-lg"
          style={{
            width: imageWidth,
            height: imageHeight,
            display: "none",
          }}
        >
          <div className="text-center px-4">
            <div className="text-sm opacity-80 mb-2">Sample Card</div>
            <div>{captionText}</div>
          </div>
        </div>

        {displayOverlayContent && overlayContent && (
          <div
            className="absolute top-0 left-0 z-10 will-change-transform"
            style={{
              transform: "translateZ(30px)",
            }}
          >
            {overlayContent}
          </div>
        )}
      </div>

      {showTooltip && captionText && (
        <figcaption
          className="pointer-events-none absolute left-0 top-0 rounded bg-white px-3 py-1 text-xs text-gray-800 z-30 shadow-md transition-all duration-150 ease-out"
          style={{
            opacity: tooltip.opacity,
            transform: `translate(${tooltip.x}px, ${tooltip.y}px) rotate(${tooltip.rotate}deg)`,
          }}
        >
          {captionText}
        </figcaption>
      )}
    </figure>
  );
}

// TiltedCarousel Component - NOW EXPORTED
export function TiltedCarousel({
  cards = [],
  slideInterval = 3000,
  cardsToShow = 1, // This will now correctly represent number of cards shown
  cardWidth = 280,
  cardHeight = 350,
  gap = 24,
  numberOfCards = 16, // Add this prop with a default value
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    setScrollLeft(walk);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Update this section to use numberOfCards directly
  const cardsToDisplay =
    cards.length > 0 ? cards : generateCards(numberOfCards);
  const totalCards = cardsToDisplay.length;

  // Fix maxIndex calculation to use totalCards
  const maxIndex = Math.max(0, totalCards - 1);

  // Update the auto-slide functionality in the TiltedCarousel component
  useEffect(() => {
    if (!isDragging) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalCards);
      }, slideInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isDragging, slideInterval, totalCards]);

  // Update navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  // Update the getCardPosition function to adjust the radius and positioning
  const getCardPosition = (index: number) => {
    const angle = (index - currentIndex) * (360 / totalCards) * (Math.PI / 180);
    const radius = cardHeight * 1.5; // Increased radius for wider circle

    // Calculate x and y positions on the circle
    const x = Math.sin(angle) * radius;
    const y = Math.cos(angle) * radius * 0.4;

    const scale = (y + radius) / (radius * 2);
    const normalizedScale = 0.7 + scale * 0.3;
    const zIndex = Math.round((y + radius) * 100);

    return {
      transform: `translate3d(${x}px, ${y}px, 0) scale(${normalizedScale})`,
      zIndex,
      opacity: normalizedScale,
    };
  };

  // Update the carousel container and navigation elements
  return (
    <div
      className="relative w-full max-w-[90vw] mx-auto px-24"
      style={{
        height: `${cardHeight * 2.4}px`, // Increased height to accommodate dots
        perspective: "1500px",
      }}
    >
      {/* Left Navigation Button - Moved further left */}
      <button
        onClick={goToPrevious}
        className="absolute left-[-150px] top-1/2 -translate-y-1/2 z-50 bg-gray-800 hover:bg-gray-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Carousel Container */}
      <div
        className="relative h-full flex items-center justify-center"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {cardsToDisplay.map((card, index) => {
          const position = getCardPosition(index);
          return (
            <div
              key={index}
              className="absolute left-1/2 top-1/2 transition-all duration-700 ease-out"
              style={{
                transform: `translateX(-50%) translateY(-50%) ${position.transform}`,
                zIndex: position.zIndex,
              }}
            >
              <TiltedCard
                imageSrc={card.imageSrc}
                altText={card.altText}
                captionText={card.captionText}
                containerHeight={`${cardHeight}px`}
                containerWidth={`${cardWidth}px`}
                imageHeight={`${cardHeight}px`}
                imageWidth={`${cardWidth}px`}
                scaleOnHover={1.1}
                rotateAmplitude={15}
                showTooltip={true}
                displayOverlayContent={!!card.overlayContent}
                overlayContent={card.overlayContent}
                isActive={index === currentIndex} // Changed from Math.abs(index - currentIndex) <= 1
              />
            </div>
          );
        })}
      </div>

      {/* Right Navigation Button - Moved further right */}
      <button
        onClick={goToNext}
        className="absolute right-[-150px] top-1/2 -translate-y-1/2 z-50 bg-gray-800 hover:bg-gray-700 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Updated Pagination Dots with proper spacing */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 flex items-center flex-wrap justify-center z-50"
        style={{
          bottom: `-${cardHeight * 0.2}px`, // Position dots below cards
          gap: `${Math.max(8, Math.min(12, 160 / totalCards))}px`, // Adjusted gap
          maxWidth: `${Math.min(cardWidth * 3, totalCards * 25)}px`, // Wider container
          padding: "16px", // Added padding
          background: "transparent", // Ensure transparent background
        }}
      >
        {Array.from({ length: maxIndex + 1 }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`transition-all duration-300 ${
              i === currentIndex
                ? "w-3 h-3 bg-gray-800"
                : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
            } rounded-full`}
          />
        ))}
      </div>
    </div>
  );
}

// Optional: Export default cards data for reuse
export const defaultCardsData = [
  {
    imageSrc: "https://picsum.photos/280/350?random=1",
    captionText: "Space Exploration",
    altText: "Space mission",
    overlayContent: (
      <div className="p-4 bg-black/60 text-white rounded-lg backdrop-blur-sm">
        <h3 className="font-bold">Space Exploration</h3>
        <p className="text-sm mt-1">Discover the cosmos</p>
      </div>
    ),
  },
  {
    imageSrc: "https://picsum.photos/280/350?random=2",
    captionText: "Earth Sciences",
    altText: "Earth from space",
    overlayContent: (
      <div className="p-4 bg-black/60 text-white rounded-lg backdrop-blur-sm">
        <h3 className="font-bold">Earth Sciences</h3>
        <p className="text-sm mt-1">Protecting our planet</p>
      </div>
    ),
  },
  {
    imageSrc: "https://picsum.photos/280/350?random=3",
    captionText: "Innovation Hub",
    altText: "Technology innovation",
    overlayContent: (
      <div className="p-4 bg-black/60 text-white rounded-lg backdrop-blur-sm">
        <h3 className="font-bold">Innovation Hub</h3>
        <p className="text-sm mt-1">Building the future</p>
      </div>
    ),
  },
  {
    imageSrc: "https://picsum.photos/280/350?random=4",
    captionText: "Global Collaboration",
    altText: "Team collaboration",
    overlayContent: (
      <div className="p-4 bg-black/60 text-white rounded-lg backdrop-blur-sm">
        <h3 className="font-bold">Global Collaboration</h3>
        <p className="text-sm mt-1">Working together</p>
      </div>
    ),
  },
  {
    imageSrc: "https://picsum.photos/280/350?random=5",
    captionText: "Data Solutions",
    altText: "Data visualization",
    overlayContent: (
      <div className="p-4 bg-black/60 text-white rounded-lg backdrop-blur-sm">
        <h3 className="font-bold">Data Solutions</h3>
        <p className="text-sm mt-1">Insights from space</p>
      </div>
    ),
  },
  {
    imageSrc: "https://picsum.photos/280/350?random=6",
    captionText: "Future Missions",
    altText: "Future space missions",
    overlayContent: (
      <div className="p-4 bg-black/60 text-white rounded-lg backdrop-blur-sm">
        <h3 className="font-bold">Future Missions</h3>
        <p className="text-sm mt-1">Next frontier</p>
      </div>
    ),
  },
];
