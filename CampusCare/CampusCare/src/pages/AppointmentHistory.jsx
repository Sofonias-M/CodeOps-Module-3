import { useAppointmentStore } from '../appointments/appointmentStore';
import { Link } from 'react-router-dom';
import StarRating from '../ui/StarRating';

export default function AppointmentHistory() {
  const appointments = useAppointmentStore((state) => state.appointments);
  const rateAppointment = useAppointmentStore((state) => state.rateAppointment);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">My Scheduled Appointments</h2>

      {appointments.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-xl border border-gray-100 shadow-sm">
          <p className="text-gray-400 text-sm mb-3">You have no scheduled appointments yet.</p>
          <Link to="/doctors" className="text-xs bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Find a Doctor
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((app) => (
            <div key={app.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-800 text-base">{app.doctorName}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  📅 <strong>Date:</strong> {app.date} at {app.time}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  📝 <strong>Reason:</strong> {app.reason}
                </p>
              </div>

              {/* Interactive Rating Component */}
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-center sm:text-right">
                <p className="text-xs font-medium text-gray-500 mb-1">
                  {app.rating > 0 ? 'Your Rating:' : 'Rate your visit:'}
                </p>
                <StarRating
                  rating={app.rating}
                  interactive={true}
                  onRate={(starValue) => rateAppointment(app.id, starValue)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}