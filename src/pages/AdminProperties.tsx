import React, { useEffect, useState } from "react";
import { usePropertyStore } from "../store/propertyStore";
import { useTranslation } from "react-i18next";

const PropertyForm = ({ propertyId, onClose }) => {
  const { t } = useTranslation();
  const { properties, updateProperty, addProperty } = usePropertyStore();
  const [propertyData, setPropertyData] = useState({
    description: "",
    price: "",
    location: "",
    contacts: "",
    dimension: "",
    rooms: "",
    floor: "",
    mapUrl: "",
    mainImage: "",
  });

  useEffect(() => {
    if (propertyId) {
      const property = properties.find((p) => p.id === propertyId);
      if (property) {
        setPropertyData({
          description: property.description || "",
          price: property.price || "",
          location: property.location || "",
          contacts: property.contacts || "",
          dimension: property.dimension || "",
          rooms: property.rooms || "",
          floor: property.floor || "",
          mapUrl: property.mapUrl || "",
          mainImage: property.mainImage || "",
        });
      }
    }
  }, [propertyId, properties]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (propertyId) {
      updateProperty(propertyId, propertyData);
    } else {
      addProperty(propertyData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">
          {propertyId ? t("admin.editProperty") : t("admin.addProperty")}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              {t("admin.form.description")}
            </label>
            <input
              type="text"
              id="description"
              value={propertyData.description}
              onChange={(e) =>
                setPropertyData({
                  ...propertyData,
                  description: e.target.value,
                })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              {t("admin.form.price")}
            </label>
            <input
              type="text"
              id="price"
              value={propertyData.price}
              onChange={(e) =>
                setPropertyData({ ...propertyData, price: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              {t("admin.form.location")}
            </label>
            <input
              type="text"
              id="location"
              value={propertyData.location}
              onChange={(e) =>
                setPropertyData({ ...propertyData, location: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="contacts"
              className="block text-sm font-medium text-gray-700"
            >
              {t("admin.form.contacts")}
            </label>
            <input
              type="text"
              id="contacts"
              value={propertyData.contacts}
              onChange={(e) =>
                setPropertyData({ ...propertyData, contacts: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="dimension"
              className="block text-sm font-medium text-gray-700"
            >
              {t("admin.form.dimension")}
            </label>
            <input
              type="text"
              id="dimension"
              value={propertyData.dimension}
              onChange={(e) =>
                setPropertyData({ ...propertyData, dimension: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="rooms"
              className="block text-sm font-medium text-gray-700"
            >
              {t("admin.form.rooms")}
            </label>
            <input
              type="text"
              id="rooms"
              value={propertyData.rooms}
              onChange={(e) =>
                setPropertyData({ ...propertyData, rooms: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="floor"
              className="block text-sm font-medium text-gray-700"
            >
              {t("admin.form.floor")}
            </label>
            <input
              type="text"
              id="floor"
              value={propertyData.floor}
              onChange={(e) =>
                setPropertyData({ ...propertyData, floor: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="mapUrl"
              className="block text-sm font-medium text-gray-700"
            >
              {t("admin.form.mapUrl")}
            </label>
            <input
              type="url"
              id="mapUrl"
              value={propertyData.mapUrl}
              onChange={(e) =>
                setPropertyData({ ...propertyData, mapUrl: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              {t("admin.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
