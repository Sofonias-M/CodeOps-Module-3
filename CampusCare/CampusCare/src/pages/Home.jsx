import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '30px 10px' }}>
      <h2>Welcome to CampusCare 🏥</h2>
      <p style={{ color: '#555', marginBottom: '20px' }}>
        Official Student Clinic Portal — Book appointments with campus doctors quickly and easily.
      </p>
      <Link 
        to="/doctors" 
        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}
      >
        Browse Doctors & Book Now →
      </Link>
    </div>
  );
}