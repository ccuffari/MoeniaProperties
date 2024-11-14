import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Mail, Shield, Trash2, UserPlus } from 'lucide-react';
import { useAuthStore, type Role } from '../store/authStore';
import InviteUserModal from '../components/admin/InviteUserModal';

export default function AdminUsers() {
  const { t } = useTranslation();
  const { user: currentUser, invites } = useAuthStore();
  const [showInviteModal, setShowInviteModal] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  // Mock users data - in a real app, this would come from an API
  const users = [
    {
      id: '1',
      name: 'John Admin',
      email: 'john@example.com',
      role: 'superadmin' as Role,
      lastLogin: '2024-03-15T10:00:00Z',
      status: 'active'
    },
    {
      id: '2',
      name: 'Sarah Manager',
      email: 'sarah@example.com',
      role: 'manager' as Role,
      lastLogin: '2024-03-14T15:30:00Z',
      status: 'active'
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRevokeInvite = async (id: string) => {
    if (window.confirm(t('admin.users.confirmRevokeInvite'))) {
      try {
        await useAuthStore.getState().revokeInvite(id);
      } catch (error) {
        console.error('Error revoking invite:', error);
      }
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('admin.users.title')}</h1>
          <button
            onClick={() => setShowInviteModal(true)}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2"
          >
            <UserPlus className="h-5 w-5" />
            {t('admin.users.invite')}
          </button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder={t('admin.users.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.users.table.user')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.users.table.role')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.users.table.lastLogin')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.users.table.status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.users.table.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-lg font-medium text-gray-600">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.lastLogin).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                        onClick={() => {/* Handle edit */}}
                      >
                        {t('admin.users.actions.edit')}
                      </button>
                      {currentUser?.id !== user.id && (
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => {/* Handle delete */}}
                        >
                          {t('admin.users.actions.delete')}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pending Invites Section */}
        {invites.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">{t('admin.users.pendingInvites')}</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.users.table.email')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.users.table.role')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.users.table.expires')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('admin.users.table.actions')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {invites.map((invite) => (
                      <tr key={invite.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-900">{invite.email}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {invite.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(invite.expiresAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleRevokeInvite(invite.id)}
                            className="text-red-600 hover:text-red-900 flex items-center gap-1"
                          >
                            <Trash2 className="h-4 w-4" />
                            {t('admin.users.actions.revoke')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {showInviteModal && (
          <InviteUserModal onClose={() => setShowInviteModal(false)} />
        )}
      </div>
    </div>
  );
}