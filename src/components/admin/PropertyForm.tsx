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
    map: property?.map || "",
    contact: property?.contact || "",
    size: property?.size || "",
    rooms: property?.rooms || 1,
    floor: property?.floor || 1,
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
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    propertyId ? updateProperty(propertyId, formData) : addProperty(formData);
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
          if (!response.ok) throw new Error(await response.text());
          const data = await response.json();
          setFormData((prev) => ({
            ...prev,
            ...(isMain
              ? { mainImage: data.url }
              : { images: [...prev.images, data.url] }),
          }));
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
                  className="w-full px-4 py-2 border rounded-lg"
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
                  className="w-full px-4 py-2 border rounded-lg"
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
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="map"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.map")}
                </label>
                <input
                  id="map"
                  type="text"
                  value={formData.map}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, map: e.target.value }))
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.contact")}
                </label>
                <input
                  id="contact"
                  type="text"
                  value={formData.contact}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contact: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-lg"
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
                  type="text"
                  value={formData.size}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, size: e.target.value }))
                  }
                  className="w-full px-4 py-2 border rounded-lg"
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
                      rooms: Number(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="floor"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.floor")}
                </label>
                <input
                  id="floor"
                  type="number"
                  value={formData.floor}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      floor: Number(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.type")}
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, type: e.target.value }))
                  }
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="House">House</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Office">Office</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.status")}
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, status: e.target.value }))
                  }
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="mainImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.mainImage")}
                </label>
                <input
                  id="mainImage"
                  type="file"
                  onChange={(e) => handleImageUpload(e, true)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="images"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.images")}
                </label>
                <input
                  id="images"
                  type="file"
                  multiple
                  onChange={(e) => handleImageUpload(e, false)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                {t("admin.form.description")}
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="beds"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.beds")}
                </label>
                <input
                  id="beds"
                  type="number"
                  value={formData.beds}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      beds: Number(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="baths"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.baths")}
                </label>
                <input
                  id="baths"
                  type="number"
                  value={formData.baths}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      baths: Number(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="sqft"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.sqft")}
                </label>
                <input
                  id="sqft"
                  type="number"
                  value={formData.sqft}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      sqft: Number(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-lg"
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
                      yearBuilt: Number(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="parking"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.parking")}
                </label>
                <input
                  id="parking"
                  type="number"
                  value={formData.parking}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      parking: Number(e.target.value),
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              {propertyId ? t("admin.update") : t("admin.add")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
