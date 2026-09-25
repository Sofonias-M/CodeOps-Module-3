import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchDoctorsApi } from '../api/doctorApi';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedDept = searchParams.get('department') || 'All';

  useEffect(() => {
    setLoading(true);
    fetchDoctorsApi()
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch doctor roster.');
        setLoading(false);
      });
  }, []);

  const filteredDoctors = selectedDept === 'All'
    ? doctors
    : doctors.filter((doc) => doc.department === selectedDept);

  if (loading) return <p>Loading campus doctors...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Campus Doctors</h2>

      {/* Department Filter */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        {['All', 'General Medicine', 'Pediatrics', 'Dermatology'].map((dept) => (
          <button
            key={dept}
            onClick={() => setSearchParams({ department: dept })}
            style={{ fontWeight: selectedDept === dept ? 'bold' : 'normal', padding: '6px 12px', cursor: 'pointer' }}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Doctor Cards */}
      {filteredDoctors.length === 0 ? (
        <p>No doctors available in this department.</p>
      ) : (
        <div style={{ display: 'grid', gap: '10px' }}>
          {filteredDoctors.map((doc) => (
            <div key={doc.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
              <h3>{doc.name}</h3>
              <p>Department: <strong>{doc.department}</strong> | Experience: {doc.experience}</p>
              <Link to={`/doctors/${doc.id}`} style={{ color: '#007bff', fontWeight: 'bold' }}>
                View Profile & Available Slots →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}