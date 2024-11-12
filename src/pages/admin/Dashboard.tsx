import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { Building2, Users, Calendar, Plus, ArrowRight } from 'lucide-react';
import { usePropertyStore } from '../../store/propertyStore';
import { Link } from 'react-router-dom';
import PropertyForm from '../../components/admin/PropertyForm';

export default function Dashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { properties } = usePropertyStore();
  const [showPropertyForm, setShowPropertyForm] = React.useState(false);

  const activeProperties = properties.filter(p => p.status === 'active').length;
  const pendingProperties = properties.filter(p => p.status === 'pending').length;
  const recentProperties = properties.slice(0, 5);

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-display text-3xl text-old-money-800 mb-2">
              {t('admin.dashboard.welcome')}
            </h1>
            <p className="text-old-money-600">
              {t('admin.dashboard.lastLogin')}: {new Date().toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => setShowPropertyForm(true)}
            className="bg-old-money-800 text-white px-6 py-3 text-sm tracking-wide hover:bg-old-money-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            {t('admin.addProperty')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white border border-old-money-100 p-8">
            <div className="flex items-center gap-4 mb-4">
              <Building2 className="h-8 w-8 text-old-money-600" />
              <h2 className="font-display text-xl text-old-money-800">
                {t('admin.dashboard.properties')}
              </h2>
            </div>
            <p className="font-display text-3xl text-old-money-800 mb-2">{activeProperties}</p>
            <p className="text-old-money-600 text-sm">
              {t('admin.dashboard.activeListings')}
              {pendingProperties > 0 && (
                <span className="text-old-money-500 ml-2">
                  +{pendingProperties} pending
                </span>
              )}
            </p>
          </div>

          {/* Similar styling for other stat cards */}
        </div>

        {showPropertyForm && (
          <PropertyForm
            propertyId={null}
            onClose={() => setShowPropertyForm(false)}
          />
        )}
      </div>
    </div>
  );
}