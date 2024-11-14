import * as React from "react";
import { X, Upload, Plus } from "lucide-react";
import { usePropertyStore } from "../../store/propertyStore";
import { useTranslation } from "react-i18next";

interface PropertyFormProps {
  propertyId: number | null;
  onClose: () => void;
}

export default function PropertyForm({
  propertyId,
  onClose,
}: PropertyFormProps) {
  const { t } = useTranslation();
  const { properties, addProperty, updateProperty } = usePropertyStore();
  const property = propertyId
    ? properties.find((p) => p.id === propertyId)
    : null;

  const [formData, setFormData] = React.useState({
    title: property?.title || "",
    description: property?.description || "",
    price: property?.price || "",
    location: property?.location || "",
    type: property?.type || "House",
    status: property?.status || "active",
    beds: property?.beds || 0,
    baths: property?.baths || 0,
    sqft: property?.sqft || 0,
    yearBuilt: property?.yearBuilt || new Date().getFullYear(),
    googleMapsLink: property?.googleMapsLink || "",
    mainImage: property?.mainImage || "",
    images: property?.images || [],
    rooms: property?.rooms || 0,
    floors: property?.floors || 0,
    contacts: property?.contacts || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (propertyId) {
      updateProperty(propertyId, formData);
    } else {
      addProperty(formData);
    }
    onClose();
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    isMain: boolean
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result?.toString().split(",")[1];
        try {
          const response = await fetch(
            "https://moeniaproperties.it/.netlify/functions/uploadImageToGitHub",
            {
              method: "POST",
              body: JSON.stringify({
                imageBase64: base64Image,
                fileName: file.name,
              }),
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
              `HTTP error! status: ${response.status}, message: ${errorText}`
            );
          }
          const data = await response.json();
          if (isMain) {
            setFormData((prev) => ({ ...prev, mainImage: data.url }));
          } else {
            setFormData((prev) => ({
              ...prev,
              images: [...prev.images, data.url],
            }));
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          alert(`Error uploading image: ${error.message}`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const removeMainImage = () => {
    setFormData((prev) => ({
      ...prev,
      mainImage: "",
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {propertyId ? t("admin.editProperty") : t("admin.addProperty")}
            </h2>
            <button onClick={onClose}>
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.title")}
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.price")}
                </label>
                <input
                  id="price"
                  type="text"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.location")}
                </label>
                <input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  required
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="googleMapsLink"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.googleMapsLink")}
                </label>
                <input
                  id="googleMapsLink"
                  type="text"
                  value={formData.googleMapsLink}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      googleMapsLink: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.type")}
                </label>
                <input
                  id="type"
                  type="text"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="yearBuilt"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.yearBuilt")}
                </label>
                <input
                  id="yearBuilt"
                  type="number"
                  value={formData.yearBuilt}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      yearBuilt: parseInt(e.target.value),
                    }))
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="size"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.size")}
                </label>
                <input
                  id="size"
                  type="number"
                  value={formData.sqft}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sqft: parseInt(e.target.value),
                    }))
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="rooms"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.rooms")}
                </label>
                <input
                  id="rooms"
                  type="number"
                  value={formData.rooms}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      rooms: parseInt(e.target.value),
                    }))
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="floors"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.floors")}
                </label>
                <input
                  id="floors"
                  type="number"
                  value={formData.floors}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      floors: parseInt(e.target.value),
                    }))
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contacts"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.contacts")}
                </label>
                <input
                  id="contacts"
                  type="text"
                  value={formData.contacts}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contacts: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-6 mt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                {t("admin.form.save")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
