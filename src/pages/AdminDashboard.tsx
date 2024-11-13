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
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <Building2 className="h-8 w-8 text-gray-700" />
              <h2 className="text-xl font-semibold">{t('admin.dashboard.properties')}</h2>
            </div>
            <p className="text-3xl font-bold">15</p>
            <p className="text-gray-600">{t('admin.dashboard.activeListings')}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <Users className="h-8 w-8 text-gray-700" />
              <h2 className="text-xl font-semibold">{t('admin.dashboard.users')}</h2>
            </div>
            <p className="text-3xl font-bold">8</p>
            <p className="text-gray-600">{t('admin.dashboard.activeUsers')}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <Calendar className="h-8 w-8 text-gray-700" />
              <h2 className="text-xl font-semibold">{t('admin.dashboard.appointments')}</h2>
            </div>
            <p className="text-3xl font-bold">5</p>
            <p className="text-gray-600">{t('admin.dashboard.upcomingAppointments')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}