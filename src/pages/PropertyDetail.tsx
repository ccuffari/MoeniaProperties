import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePropertyStore } from '../store/propertyStore';
import { MapPin, Bed, Bath, Square, ArrowLeft } from 'lucide-react';
import ScheduleModal from '../components/ScheduleModal';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { properties } = usePropertyStore();
  const property = properties.find(p => p.id === id);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = React.useState(false);

  if (!property) {
    return (
      <div className="pt-24 pb-16 bg-cream min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="font-display text-3xl text-old-money-800 mb-6">{t('property.notFound')}</h1>
            <button 
              onClick={() => navigate('/properties')}
              className="text-old-money-600 hover:text-old-money-800 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              {t('property.backToProperties')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-cream min-h-screen">
      <Helmet>
        <title>{`${property.title} | Moenia Properties`}</title>
        <meta name="description" content={property.description} />
      </Helmet>

      <div className="container mx-auto px-4">
        <button 
          onClick={() => navigate('/properties')}
          className="text-old-money-600 hover:text-old-money-800 flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          {t('property.backToProperties')}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative h-[600px]">
            <img 
              src={property.mainImage} 
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-old-money-800 px-4 py-1 text-xs tracking-wide">
              {t(`properties.types.${property.type.toLowerCase()}`)}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="font-display text-4xl text-old-money-800 mb-4">{property.title}</h1>
              <div className="flex items-center text-old-money-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{property.location}</span>
              </div>
              <p className="font-display text-3xl text-old-money-800">{property.price}</p>
            </div>

            <div className="grid grid-cols-3 gap-8 py-8 border-y border-old-money-100">
              {property.beds !== null && (
                <div className="text-center">
                  <Bed className="h-6 w-6 mx-auto mb-2 text-old-money-600" />
                  <p className="font-display text-xl text-old-money-800">{property.beds}</p>
                  <p className="text-old-money-600 text-sm">{t('properties.details.beds')}</p>
                </div>
              )}
              <div className="text-center">
                <Bath className="h-6 w-6 mx-auto mb-2 text-old-money-600" />
                <p className="font-display text-xl text-old-money-800">{property.baths}</p>
                <p className="text-old-money-600 text-sm">{t('properties.details.baths')}</p>
              </div>
              <div className="text-center">
                <Square className="h-6 w-6 mx-auto mb-2 text-old-money-600" />
                <p className="font-display text-xl text-old-money-800">{property.sqft}</p>
                <p className="text-old-money-600 text-sm">{t('properties.details.sqft')}</p>
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl text-old-money-800 mb-4">
                {t('properties.details.features')}
              </h2>
              <p className="text-old-money-600 leading-relaxed">{property.description}</p>
            </div>

            {property.features && property.features.length > 0 && (
              <div className="grid grid-cols-2 gap-4">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-old-money-600">
                    <span className="w-2 h-2 bg-old-money-800 rounded-full mr-2"></span>
                    {feature}
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-4">
              <button 
                onClick={() => setIsScheduleModalOpen(true)}
                className="flex-1 bg-old-money-800 text-white px-6 py-3 text-sm tracking-wide hover:bg-old-money-700 transition-colors"
              >
                {t('properties.details.schedule')}
              </button>
              <button 
                className="flex-1 border border-old-money-800 text-old-money-800 px-6 py-3 text-sm tracking-wide hover:bg-old-money-50 transition-colors"
              >
                {t('properties.details.contact')}
              </button>
            </div>
          </div>
        </div>

        <ScheduleModal
          isOpen={isScheduleModalOpen}
          onClose={() => setIsScheduleModalOpen(false)}
          propertyTitle={property.title}
        />
      </div>
    </div>
  );
}