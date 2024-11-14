import * as React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import Footer from './components/Footer';
import CookieConsentBanner from './components/CookieConsentBanner';
import Home from './pages/Home';
import Properties from './pages/Properties';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Services from './pages/Services';
import PropertyDetail from './pages/PropertyDetail';
import Dashboard from './pages/admin/Dashboard';
import AdminProperties from './pages/AdminProperties';
import AdminUsers from './pages/AdminUsers';
import AdminSettings from './pages/AdminSettings';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './hooks/useAuth';
import { usePropertyStore } from './store/propertyStore';

const App: React.FC = () => {
  const { user } = useAuth();
  const { fetchProperties } = usePropertyStore();

  // Fetch properties when the app loads
  React.useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/login" element={
              user ? <Navigate to="/admin/dashboard" replace /> : <Login />
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/admin/properties" element={
              <PrivateRoute>
                <AdminProperties />
              </PrivateRoute>
            } />
            <Route path="/admin/users" element={
              <PrivateRoute>
                <AdminUsers />
              </PrivateRoute>
            } />
            <Route path="/admin/settings" element={
              <PrivateRoute>
                <AdminSettings />
              </PrivateRoute>
            } />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
          <CookieConsentBanner />
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;