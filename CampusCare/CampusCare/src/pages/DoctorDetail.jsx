import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchDoctorsApi } from '../api/doctorApi';

export default function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctorsApi().then((data) => {
      const found = data.find((d) => d.id === id);
      setDoctor(found);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p>Loading doctor profile...</p>;
  if (!doctor) return <p style={{ color: 'red' }}>Doctor not found.</p>;

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
      <h2>{doctor.name}</h2>
      <p><strong>Department:</strong> {doctor.department}</p>
      <p><strong>Experience:</strong> {doctor.experience}</p>
      
      <h4>Available Appointment Slots:</h4>
      <ul>
        {doctor.slots.map((slot) => (
          <li key={slot} style={{ marginBottom: '5px' }}>{slot}</li>
        ))}
      </ul>

      <Link 
        to={`/booking?doctorId=${doctor.id}&doctorName=${encodeURIComponent(doctor.name)}`}
        style={{ display: 'inline-block', marginTop: '15px', padding: '10px 15px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '4px' }}
      >
        Book Appointment With {doctor.name}
      </Link>
    </div>
  );
}