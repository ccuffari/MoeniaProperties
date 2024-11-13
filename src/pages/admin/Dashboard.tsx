import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { Building2, Users, Calendar, Plus, Search, ArrowRight } from 'lucide-react';
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
  const recentProperties = properties.slice(0, 5); // Get last 5 properties

  // Mock appointments data
  const upcomingAppointments = [
    {
      id: 1,
      clientName: "John Doe",
      propertyTitle: "Luxury Villa",
      date: new Date().toISOString(),
      time: "14:00"
    },
    {
      id: 2,
      clientName: "Jane Smith",
      propertyTitle: "Modern Apartment",
      date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      time: "10:30"
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{t('admin.dashboard.welcome')}</h1>
            <p className="text-gray-600 mt-2">
              {t('admin.dashboard.lastLogin')}: {new Date().toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => setShowPropertyForm(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            {t('admin.addProperty')}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <Building2 className="h-8 w-8 text-gray-700" />
              <h2 className="text-xl font-semibold">{t('admin.dashboard.properties')}</h2>
            </div>
            <p className="text-3xl font-bold">{activeProperties}</p>
            <div className="flex justify-between items-center mt-2">
              <p className="text-gray-600">{t('admin.dashboard.activeListings')}</p>
              <span className="text-sm text-green-600">+{pendingProperties} pending</span>
            </div>
          </div>

           <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <Users className="h-8 w-8 text-gray-700" />
              {/* <h2 className="text-xl font-semibold">{t('admin.dashboard.users')}</h2>
            </div>
            <p className="text-3xl font-bold">8</p>
            <p className="text-gray-600">{t('admin.dashboard.activeUsers')}</p> */}
          </div> */

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <Calendar className="h-8 w-8 text-gray-700" />
              {/* <h2 className="text-xl font-semibold">{t('admin.dashboard.appointments')}</h2>
            </div>
            <p className="text-3xl font-bold">{upcomingAppointments.length}</p>
            <p className="text-gray-600">{t('admin.dashboard.upcomingAppointments')}</p> */}
          </div>
        </div>

        {/* Recent Properties and Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Properties */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{t('admin.dashboard.recentProperties')}</h2>
              <Link 
                to="/admin/properties"
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
              >
                {t('admin.viewAll')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentProperties.map((property) => (
                <div key={property.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg">
                  <img
                    src={property.mainImage}
                    alt={property.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{property.title}</h3>
                    <p className="text-sm text-gray-600">{property.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{property.price}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      property.status === 'active' ? 'bg-green-100 text-green-800' :
                      property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {property.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {/* <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{t('admin.dashboard.upcomingAppointments')}</h2>
              <Link 
                to="/admin/appointments"
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
              >
                {t('admin.viewAll')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div> */}
            {/* <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{appointment.clientName}</h3>
                      <p className="text-sm text-gray-600">{appointment.propertyTitle}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{appointment.time}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(appointment.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
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