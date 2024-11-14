import * as React from 'react';
import { Calendar, Clock, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AppointmentCalendar() {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  // Mock appointments data - in a real app, this would come from an API
  const appointments = [

  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        {/* Calendar Component */}
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">{t('admin.calendar.title')}</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-50">
                {t('admin.calendar.today')}
              </button>
              <select className="text-sm border rounded-lg px-2">
                <option>{t('admin.calendar.month')}</option>
                <option>{t('admin.calendar.week')}</option>
                <option>{t('admin.calendar.day')}</option>
              </select>
            </div>
          </div>
          
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Calendar implementation would go here */}
            <div className="aspect-square border p-2 text-center">1</div>
            {/* ... more days */}
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold mb-4">{t('admin.calendar.upcoming')}</h3>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{appointment.clientName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{appointment.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(appointment.date).toLocaleDateString()}</span>
                </div>
                <div className="mt-2 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    appointment.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}