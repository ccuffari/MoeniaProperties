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
    googleMapsLink: property?.googleMapsLink || "",
    mainImage: property?.mainImage || "",
    images: property?.images || [],
    rooms: property?.rooms || 0,
    floors: property?.floors || 0,
    contacts: property?.contacts || "",
    size: property?.size || 0,
    actions: property?.actions || "",
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
                  {t("admin.table.property")}
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
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.table.status")}
                </label>
                <input
                  id="status"
                  type="text"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.table.prize")}
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
                  htmlFor="googleMapsLink"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.table.googleMapsLink")}
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
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.table.description")}
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
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="size"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.table.size")}
                </label>
                <input
                  id="size"
                  type="number"
                  value={formData.size}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      size: parseInt(e.target.value),
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
                  {t("admin.table.rooms")}
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
                  {t("admin.table.floor")}
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
                  {t("admin.table.contacts")}
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

              <div className="space-y-2">
                <label
                  htmlFor="actions"
                  className="block text-sm font-medium text-gray-700"
                >
                  {t("admin.table.actions")}
                </label>
                <input
                  id="actions"
                  type="text"
                  value={formData.actions}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      actions: e.target.value,
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
