import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../store/authStore';
import { Building2, Users, Calendar } from 'lucide-react';

export default function AdminDashboard() {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">{t('admin.dashboard.welcome')}</h1>
          <p className="text-gray-600 mt-2">
            {t('admin.dashboard.lastLogin')}: {new Date().toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        </div>
      </div>
    </div>
  );
}