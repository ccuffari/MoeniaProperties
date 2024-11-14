import * as React from "react";
import { X, Upload, Plus, Trash2 } from "lucide-react";
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
    parking: property?.parking || 0,
    features: property?.features || [],
    mainImage: property?.mainImage || "",
    images: property?.images || [],
    // New attributes
    map: property?.map || "",
    contacts: property?.contacts || "",
    size: property?.size || 0,
    rooms: property?.rooms || 0,
    floor: property?.floor || 0,
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
              {/* Existing form fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("admin.form.title")}
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              {/* New form fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("admin.form.map")}
                </label>
                <input
                  type="text"
                  value={formData.map}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, map: e.target.value }))
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("admin.form.contacts")}
                </label>
                <input
                  type="text"
                  value={formData.contacts}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contacts: e.target.value,
                    }))
                  }
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("admin.form.size")}
                </label>
                <input
                  type="number"
                  value={formData.size}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      size: parseInt(e.target.value),
                    }))
                  }
                  className="w-full p-2 border rounded-lg"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("admin.form.rooms")}
                </label>
                <input
                  type="number"
                  value={formData.rooms}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      rooms: parseInt(e.target.value),
                    }))
                  }
                  className="w-full p-2 border rounded-lg"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("admin.form.floor")}
                </label>
                <input
                  type="number"
                  value={formData.floor}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      floor: parseInt(e.target.value),
                    }))
                  }
                  className="w-full p-2 border rounded-lg"
                  min="0"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                {t("admin.form.cancel")}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                {propertyId ? t("admin.form.save") : t("admin.form.create")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
