import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAppointmentStore } from './appointments/appointmentStore';
import { useAuthStore } from './auth/authStore';
import { StudentOnly, DoctorOnly } from './auth/RoleGuard';

import Home from './pages/Home';
import Doctors from './pages/Doctors';
import DoctorDetail from './pages/DoctorDetail';
import Booking from './pages/Booking';
import AppointmentHistory from './pages/AppointmentHistory';
import DoctorDashboard from './pages/DoctorDashboard';

function Layout() {
  const appointments = useAppointmentStore((state) => state.appointments);
  const { isLoggedIn, user, logout, switchRole } = useAuthStore();

  return (
    <header className="bg-white border-b border-gray-100 mb-6 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="text-xl">🏥</span>
          <h1 className="text-lg font-bold text-blue-600 tracking-tight">CampusCare</h1>
        </div>

        {/* Dynamic Nav Links Based on Role */}
        <nav className="flex items-center space-x-4 text-xs font-medium text-gray-600">
          {user?.role === 'doctor' ? (
            <Link to="/doctor-dashboard" className="text-emerald-700 font-bold hover:underline">
              🩺 Doctor Portal
            </Link>
          ) : (
            <>
              <Link to="/" className="hover:text-blue-600 transition">Dashboard</Link>
              <Link to="/doctors" className="hover:text-blue-600 transition">Doctors</Link>
              <Link to="/history" className="hover:text-blue-600 transition">
                My Visits ({appointments.length})
              </Link>
            </>
          )}
        </nav>

        {/* Role Switcher Controls */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400 font-medium hidden sm:inline">Role:</span>
          <select
            value={user?.role || 'student'}
            onChange={(e) => switchRole(e.target.value)}
            className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-gray-50 font-semibold text-gray-700 outline-none focus:border-blue-500"
          >
            <option value="student">🎓 Student View</option>
            <option value="doctor">🩺 Doctor View</option>
          </select>

          {isLoggedIn && (
            <button
              onClick={logout}
              className="text-xs text-gray-500 hover:text-red-600 border border-gray-200 px-2.5 py-1 rounded-lg transition"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900 pb-10">
        <Layout />
        <main className="max-w-4xl mx-auto px-4">
          <Routes>
            {/* Student Routes */}
            <Route path="/" element={<StudentOnly><Home /></StudentOnly>} />
            <Route path="/doctors" element={<StudentOnly><Doctors /></StudentOnly>} />
            <Route path="/doctors/:id" element={<StudentOnly><DoctorDetail /></StudentOnly>} />
            <Route path="/booking" element={<StudentOnly><Booking /></StudentOnly>} />
            <Route path="/history" element={<StudentOnly><AppointmentHistory /></StudentOnly>} />

            {/* Doctor Routes */}
            <Route path="/doctor-dashboard" element={<DoctorOnly><DoctorDashboard /></DoctorOnly>} />

            <Route path="*" element={<h2 className="text-center py-10 font-bold">404 - Page Not Found</h2>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}