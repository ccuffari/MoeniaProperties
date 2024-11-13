import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usePropertyStore } from "../store/propertyStore";
import { MapPin, Bed, Bath, Square, ArrowLeft } from "lucide-react";
import ScheduleModal from "../components/ScheduleModal";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { properties } = usePropertyStore();
  const property = properties.find((p) => p.id === id);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = React.useState(false);

  // Carousel state and logic
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const allImages = [property.mainImage, ...property.images]; // Include main image

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

  if (!property) {
    return (
      <div className="pt-24 pb-16">
        <Helmet>
          <title>{t("property.notFound")} - Moenia Properties</title>
          <meta name="description" content={t("property.notFound")} />
        </Helmet>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">
              {t("property.notFound")}
            </h1>
            <button
              onClick={() => navigate("/properties")}
              className="text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-5 w-5" />
              {t("property.backToProperties")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    image: property.mainImage,
    price: property.price,
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.sqft,
      unitCode: "FTK",
    },
  };

  return (
    <div className="pt-24 pb-16">
      <Helmet>
        <title>{`${property.title} - ${property.location} | Moenia Properties`}</title>
        <meta
          name="description"
          content={`${property.description} ${t("property.location")}: ${
            property.location
          }. ${property.sqft} ${t("property.sqft")}, ${property.beds} ${t(
            "property.beds"
          )}, ${property.baths} ${t("property.baths")}. ${t(
            "property.scheduleViewing"
          )}.`}
        />
        <meta
          property="og:title"
          content={`${property.title} - ${property.location}`}
        />
        <meta property="og:description" content={property.description} />
        <meta property="og:image" content={property.mainImage} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate("/properties")}
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          {t("property.backToProperties")}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative h-[400px] lg:h-[600px]">
            <img
              src={allImages[currentImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full">
              {t(`hero.propertyType.${property.type.toLowerCase()}`)}
            </div>

            {/* Carousel controls */}
            {allImages.length > 1 && (
              <div className="absolute inset-0 flex justify-between items-center p-4">
                <button
                  onClick={handlePrevious}
                  className="bg-gray-800 bg-opacity-50 text-white h-10 w-10 flex items-center justify-center rounded-full hover:bg-opacity-75"
                >
                  &lt;
                </button>
                <button
                  onClick={handleNext}
                  className="bg-gray-800 bg-opacity-50 text-white h-10 w-10 flex items-center justify-center rounded-full hover:bg-opacity-75"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{property.location}</span>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {property.price}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200">
              {property.beds !== null && (
                <div className="text-center">
                  <Bed className="h-6 w-6 mx-auto mb-2" />
                  <p className="font-semibold">{property.beds}</p>
                  <p className="text-gray-600">{t("property.beds")}</p>
                </div>
              )}
              <div className="text-center">
                <Bath className="h-6 w-6 mx-auto mb-2" />
                <p className="font-semibold">{property.baths}</p>
                <p className="text-gray-600">{t("property.baths")}</p>
              </div>
              <div className="text-center">
                <Square className="h-6 w-6 mx-auto mb-2" />
                <p className="font-semibold">{property.sqft}</p>
                <p className="text-gray-600">{t("property.sqft")}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">
                {t("property.description")}
              </h2>
              <p className="text-gray-600">{property.description}</p>
            </div>

            {property.features && property.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  {t("property.features")}
                </h2>
                <ul className="grid grid-cols-2 gap-4">
                  {property.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-gray-900 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* <button
              onClick={() => setIsScheduleModalOpen(true)}
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800"
            >
              {t("property.scheduleViewing")}
            </button> */}
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
