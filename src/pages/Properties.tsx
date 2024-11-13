import * as React from 'react';
import { usePropertyStore } from '../store/propertyStore';
import SearchFilters from '../components/SearchFilters';
import PropertyCard from '../components/PropertyCard';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function Properties() {
  const { t } = useTranslation();
  const { properties, loading, error } = usePropertyStore();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": properties.map((property, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "RealEstateListing",
        "name": property.title,
        "description": property.description,
        "image": property.mainImage,
        "price": property.price,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": property.location
        }
      }
    }))
  };

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <Helmet>
        <title>{t('properties.meta.title')}</title>
        <meta name="description" content={t('properties.meta.description')} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">{t('properties.title')}</h1>
        <SearchFilters />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.length > 0 ? (
            properties.map((property) => (
              // Pass the entire `property` object to ensure `images` is included
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl text-gray-600">{t('properties.noResults')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
