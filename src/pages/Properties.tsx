import * as React from 'react';
import { usePropertyStore } from '../store/propertyStore';
import SearchFilters from '../components/SearchFilters';
import PropertyCard from '../components/PropertyCard';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export default function Properties() {
  const { t } = useTranslation();
  const { properties, loading, error } = usePropertyStore();

  // Stato per gestire i preferiti
  const [favorites, setFavorites] = React.useState<string[]>([]);

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(propertyId)
        ? prevFavorites.filter((id) => id !== propertyId)
        : [...prevFavorites, propertyId]
    );
  };

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
              <div key={property.id} className="relative">
                <PropertyCard
                  id={property.id}
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  mainImage={property.mainImage}
                  images={property.images}
                  beds={property.beds}
                  baths={property.baths}
                  sqft={property.sqft}
                  type={property.type}
                  status={property.status}
                />
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-4 right-4 bg-gray-900 text-white px-3 py-1 rounded-full hover:bg-gray-800"
                >
                  {favorites.includes(property.id)
                    ? t('properties.removeFromFavorites')
                    : t('properties.addToFavorites')}
                </button>
              </div>
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
