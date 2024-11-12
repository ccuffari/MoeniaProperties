import * as React from 'react';
import { X, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle: string;
}

export default function ScheduleModal({ isOpen, onClose, propertyTitle }: ScheduleModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{t('property.details.schedule')}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          {t('property.details.schedule')}: <span className="font-semibold">{propertyTitle}</span>
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('contact.form.name')}
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-900"
              placeholder={t('contact.form.name')}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('contact.form.email')}
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-900"
              placeholder={t('contact.form.email')}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('property.details.schedule')}
            </label>
            <input
              type="date"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-900"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('contact.form.message')}
            </label>
            <textarea
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-gray-900"
              rows={3}
              placeholder={t('contact.form.message')}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2"
          >
            <Calendar className="h-5 w-5" />
            {t('property.scheduleViewing')}
          </button>
        </form>
      </div>
    </div>
  );
}