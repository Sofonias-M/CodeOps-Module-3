import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAppointmentStore } from './appointments/appointmentStore';
import { useAuthStore } from './auth/authStore';

import Home from './pages/Home';
import Doctors from './pages/Doctors';
import DoctorDetail from './pages/DoctorDetail';
import Booking from './pages/Booking';
import AppointmentHistory from './pages/AppointmentHistory';

function Layout() {
  const appointments = useAppointmentStore((state) => state.appointments);
  const { isLoggedIn, user, logout, login } = useAuthStore();

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '1.4rem' }}>CampusCare</h1>
        <Link to="/">Home</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/history">
          My Appointments ({appointments.length})
        </Link>
        <div style={{ marginLeft: 'auto' }}>
          {isLoggedIn ? (
            <button onClick={logout}>Sign Out ({user.name})</button>
          ) : (
            <button onClick={login}>Sign In</button>
          )}
        </div>
      </header>
      <hr />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetail />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/history" element={<AppointmentHistory />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}