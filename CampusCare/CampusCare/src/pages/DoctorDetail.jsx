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

  if (loading) return <p className="text-center py-10 text-gray-500">Loading doctor profile...</p>;
  if (!doctor) return <p className="text-center py-10 text-red-500">Doctor not found.</p>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
      <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-3 ring-4 ring-blue-50" />
      <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
      <p className="text-xs font-semibold text-blue-600 mb-1">{doctor.department}</p>
      <p className="text-xs text-gray-400 mb-6">Experience: {doctor.experience}</p>

      <div className="text-left bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
        <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Available Time Slots:</h4>
        <div className="flex flex-wrap gap-2">
          {doctor.slots.map((slot) => (
            <span key={slot} className="bg-white border border-gray-200 px-2.5 py-1 rounded text-xs font-medium text-gray-600">
              🕒 {slot}
            </span>
          ))}
        </div>
      </div>

      <Link
        to={`/booking?doctorId=${doctor.id}&doctorName=${encodeURIComponent(doctor.name)}`}
        className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-lg shadow-sm transition"
      >
        Book Appointment With {doctor.name.split(' ')[1]}
      </Link>
    </div>
  );
}