import * as React from 'react';
import { usePropertyStore } from '../store/propertyStore';
import PropertyCard from '../components/PropertyCard';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function Properties() {
  const { t } = useTranslation();
  const { properties, loading, error } = usePropertyStore();

  if (loading) {
    return (
      <div className="pt-24 pb-16 bg-cream min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-old-money-800"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-16 bg-cream min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center text-old-money-600">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-cream min-h-screen">
      <Helmet>
        <title>{t('properties.title')} | Moenia Properties</title>
        <meta name="description" content={t('properties.subtitle')} />
      </Helmet>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl text-old-money-800 mb-6">
            {t('properties.title')}
          </h1>
          <p className="text-old-money-600 text-lg">
            {t('properties.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-old-money-600">{t('properties.noResults')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}