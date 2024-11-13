import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative h-64">
      <img
        src={images[currentIndex]}
        alt={alt}
        className="w-full h-full object-cover"
      />
      {images.length > 1 && (
        <div className="absolute inset-0 flex justify-between items-center p-4">
          <button
            onClick={handlePrevious}
            className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}