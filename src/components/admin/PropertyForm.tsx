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
              {/* Title Input */}
              <TextInput
                label={t("admin.form.title")}
                value={formData.title}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, title: value }))
                }
                required
              />

              {/* Price Input */}
              <TextInput
                label={t("admin.form.price")}
                value={formData.price}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, price: value }))
                }
                required
              />

              {/* Location Input */}
              <TextInput
                label={t("admin.form.location")}
                value={formData.location}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, location: value }))
                }
                required
              />

              {/* Type Dropdown */}
              <SelectInput
                label={t("admin.form.type")}
                value={formData.type}
                options={["House", "Apartment", "Office"]}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, type: value }))
                }
                required
              />

              {/* Status Dropdown */}
              <SelectInput
                label={t("admin.form.status")}
                value={formData.status}
                options={["active", "pending", "sold"]}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
                required
              />

              {/* Main Image Upload */}
              <ImageUpload
                label={t("admin.form.mainImage")}
                image={formData.mainImage}
                onUpload={(e) => handleImageUpload(e, true)}
              />

              {/* Additional Images Upload */}
              <MultipleImageUpload
                label={t("admin.form.additionalImages")}
                images={formData.images}
                onUpload={(e) => handleImageUpload(e, false)}
                onRemove={removeImage}
              />
            </div>

            {/* Description Textarea */}
            <TextArea
              label={t("admin.form.description")}
              value={formData.description}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, description: value }))
              }
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <NumberInput
                label={t("admin.form.beds")}
                value={formData.beds}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, beds: value }))
                }
              />

              <NumberInput
                label={t("admin.form.baths")}
                value={formData.baths}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, baths: value }))
                }
              />

              <NumberInput
                label={t("admin.form.sqft")}
                value={formData.sqft}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, sqft: value }))
                }
              />
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
