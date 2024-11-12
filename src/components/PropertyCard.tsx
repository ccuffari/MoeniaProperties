import * as React from 'react';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ImageCarousel from './ImageCarousel';

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
  status
}: PropertyCardProps) {
  const { t } = useTranslation();

  return (
    <Link to={`/property/${id}`}>
      <div className="bg-white border border-old-money-100 hover:border-old-money-200 transition-all">
        <div className="relative">
          <ImageCarousel images={[mainImage, ...images]} alt={title} />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-old-money-800 px-4 py-1 text-xs tracking-wide">
            {t(`hero.propertyType.${type.toLowerCase()}`)}
          </div>
          {status !== 'active' && (
            <div className="absolute top-4 left-4 bg-old-money-800/90 backdrop-blur-sm text-white px-4 py-1 text-xs tracking-wide uppercase">
              {status}
            </div>
          )}
        </div>
        
        <div className="p-8">
          <div className="mb-4">
            <h3 className="font-display text-xl text-old-money-800 mb-2">{title}</h3>
            <div className="flex items-center text-old-money-600 text-sm">
              <MapPin className="h-4 w-4 mr-2" />
              <p>{location}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-end">
            <div className="grid grid-cols-3 gap-4 text-old-money-600 text-sm">
              {beds !== null && (
                <div className="flex items-center">
                  <Bed className="h-4 w-4 mr-1" />
                  <span>{beds}</span>
                </div>
              )}
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{baths}</span>
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 mr-1" />
                <span>{sqft}</span>
              </div>
            </div>
            <p className="font-display text-xl text-old-money-800">{price}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}