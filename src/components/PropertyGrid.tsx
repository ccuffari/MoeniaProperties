import * as React from 'react';
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePropertyStore } from '../store/propertyStore';

export default function PropertyGrid() {
  const { t } = useTranslation();
  const { properties } = usePropertyStore();

  return (
    <section id="properties" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12">{t('properties.featured')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => ( //torna indietro
          <div key={property.title} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative h-64">
              <img
                src={property.image}
                alt={t(`properties.title`)} //torare indietro
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-full">
                {t(`hero.propertyType.${property.type.toLowerCase()}`)}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{t(`properties.items.${property.id}.title`)}</h3>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                {property.location}
              </div>
              <div className="flex justify-between items-center mb-4">
                {property.beds && (
                  <div className="flex items-center">
                    <Bed className="h-4 w-4 mr-1" />
                    <span>{property.beds} {t('property.beds')}</span>
                  </div>
                )}
                {property.baths && (
                  <div className="flex items-center">
                    <Bath className="h-4 w-4 mr-1" />
                    <span>{property.baths} {t('property.baths')}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Square className="h-4 w-4 mr-1" />
                  <span>{property.sqft} {t('property.sqft')}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-900">{property.price}</span>
                <Link 
                  to={`/property/${property.id}`}
                  className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                >
                  {t('properties.viewDetails')}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}