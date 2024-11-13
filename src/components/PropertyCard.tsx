// PropertyCard.tsx
import * as React from 'react';
import { MapPin, Bed, Bath, Square, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  mainImage: string;
  images: string[];
  beds: number | null;
  baths: number;
  sqft: number;
  type: string;
  status: 'active' | 'pending' | 'sold';
}

export default function PropertyCard({
  id,
  title,
  location,
  price,
  mainImage,
  images,
  beds,
  baths,
  sqft,
  type,
  status,
}: PropertyCardProps) {
  const { t } = useTranslation();
  const history = useHistory();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const allImages = [mainImage, ...images];

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageClick = () => {
    history.push(`/property/${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative h-64 cursor-pointer" onClick={handleImageClick}>
        <img
          src={allImages[currentImageIndex]}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-full">
          {t(`hero.propertyType.${type.toLowerCase()}`)}
        </div>
        
        {/* Carousel controls */}
        {allImages.length > 1 && (
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
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>  
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          {location}
        </div>
        <div className="flex justify-between items-center mb-4">
          {beds !== null && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{beds} {t('property.beds')}</span>
            </div>
          )}
          {baths && (
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{baths} {t('property.baths')}</span>
            </div>
          )}
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{sqft} {t('property.sqft')}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">{price}</span>
          <Link 
            to={`/property/${id}`}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            {t('properties.viewDetails')}
          </Link>
        </div>
      </div>
    </div>
  );
}