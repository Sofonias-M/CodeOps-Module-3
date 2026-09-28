import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchDoctorsApi } from '../api/doctorApi';
import StarRating from '../ui/StarRating';

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

  if (loading) return <p className="text-center py-10 text-gray-500">Loading campus doctors...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800">Campus Doctors</h2>
        <p className="text-xs text-gray-500">Browse trusted campus clinic specialists and patient ratings.</p>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {['All', 'General Medicine', 'Pediatrics', 'Dermatology'].map((dept) => (
          <button
            key={dept}
            onClick={() => setSearchParams({ department: dept })}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition ${
              selectedDept === dept
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Doctor Cards Grid with Star Ratings */}
      {filteredDoctors.length === 0 ? (
        <p className="text-gray-500 py-6 text-sm">No doctors available in this department.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col items-center text-center">
              <img src={doc.image} alt={doc.name} className="w-20 h-20 rounded-full object-cover mb-3 ring-2 ring-blue-50" />
              <h3 className="font-bold text-gray-800 text-base">{doc.name}</h3>
              <p className="text-xs font-semibold text-blue-600 mb-1">{doc.department}</p>
              
              {/* Star Rating Badge */}
              <div className="my-2">
                <StarRating rating={doc.rating} reviewCount={doc.reviewCount} />
              </div>

              <p className="text-xs text-gray-400 mb-4">Experience: {doc.experience}</p>
              <Link
                to={`/doctors/${doc.id}`}
                className="w-full mt-auto bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold py-2 rounded-lg transition text-center"
              >
                View Profile & Book
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}