import * as React from "react";
import { Search } from "lucide-react";
import { usePropertyStore } from "../store/propertyStore";
import { useTranslation } from "react-i18next";

export default function SearchFilters() {
  const { t } = useTranslation();
  const {
    searchTerm,
    propertyType,
    priceRange,
    location,
    setSearchTerm,
    setPropertyType,
    setPriceRange,
    setLocation,
    fetchProperties, // Supponendo che esista una funzione nel tuo store per filtrare i risultati
  } = usePropertyStore();

  const handleSearch = () => {
    fetchProperties({ searchTerm, propertyType, priceRange, location });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("search.placeholder")}
          </label>
          <input
            type="text"
            placeholder={t("search.placeholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("search.propertyType")}
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">{t("hero.propertyType.all")}</option>
            <option value="House">{t("hero.propertyType.house")}</option>
            <option value="Apartment">
              {t("hero.propertyType.apartment")}
            </option>
            <option value="Office">{t("hero.propertyType.office")}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("search.priceRange.label")}
          </label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">{t("search.priceRange.any")}</option>
            <option value="0-1000000">{t("search.priceRange.upTo1M")}</option>
            <option value="1000000-5000000">
              {t("search.priceRange.1Mto5M")}
            </option>
            <option value="5000000+">{t("search.priceRange.above5M")}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("search.location")}
          </label>
          <input
            type="text"
            placeholder={t("search.location")}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>

      {/* Pulsante di ricerca
      <div className="mt-4">
        <button
          onClick={handleSearch}
          className="w-full md:w-auto bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center"
        >
          <Search className="mr-2" />
          {t("search.button")}
        </button>
      </div>
    </div> */}
  );
}
