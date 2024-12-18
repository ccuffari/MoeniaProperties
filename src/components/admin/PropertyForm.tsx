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
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="House">{t("hero.propertyType.house")}</option>
                  <option value="Apartment">
                    {t("hero.propertyType.apartment")}
                  </option>
                  <option value="Office">
                    {t("hero.propertyType.office")}
                  </option>
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
                    setFormData((prev) => ({
                      ...prev,
                      status: e.target.value as any,
                    }))
                  }
                  required
                  className="w-full p-2 border rounded-lg"
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
                <div className="flex items-center gap-4">
                  {formData.mainImage && (
                    <div className="relative">
                      <img
                        src={formData.mainImage}
                        alt="Main property image"
                        className="h-20 w-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeMainImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  <label className="cursor-pointer bg-gray-100 p-4 rounded-lg hover:bg-gray-200">
                    <Upload className="h-6 w-6" />
                    <input
                      id="mainImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, true)}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="additionalImages"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.form.additionalImages")}
                </label>
                <div className="flex flex-wrap gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Property image ${index + 1}`}
                        className="h-20 w-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <label className="cursor-pointer bg-gray-100 p-4 rounded-lg hover:bg-gray-200">
                    <Plus className="h-6 w-6" />
                    <input
                      id="additionalImages"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, false)}
                      className="hidden"
                    />
                  </label>
                </div>
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
                className="w-full p-2 border rounded-lg"
                rows={4}
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
                      beds: parseInt(e.target.value),
                    }))
                  }
                  className="w-full p-2 border rounded-lg"
                  min="0"
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
                      baths: parseInt(e.target.value),
                    }))
                  }
                  className="w-full p-2 border rounded-lg"
                  min="0"
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
                      sqft: parseInt(e.target.value),
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
