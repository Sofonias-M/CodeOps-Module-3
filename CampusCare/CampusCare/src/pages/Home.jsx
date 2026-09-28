import { Link } from 'react-router-dom';
import { useAppointmentStore } from '../appointments/appointmentStore';
import { useAuthStore } from '../auth/authStore';

export default function Home() {
  const appointments = useAppointmentStore((state) => state.appointments);
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 md:p-8 shadow-md">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome back, {user?.name || 'Student'} 👋
        </h2>
        <p className="text-blue-100 max-w-xl text-sm md:text-base">
          CampusCare Student Health Portal. Manage your medical visits, schedule clinic consults, and keep track of your health records.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/doctors"
            className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-4 py-2.5 rounded-lg text-sm shadow transition"
          >
            Book New Appointment
          </Link>
          <Link
            to="/history"
            className="bg-blue-800 bg-opacity-40 hover:bg-opacity-60 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition"
          >
            View My Visits ({appointments.length})
          </Link>
        </div>
      </div>

      {/* Analytics Dashboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg text-2xl">📅</div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Total Scheduled</p>
            <p className="text-2xl font-bold text-gray-800">{appointments.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg text-2xl">👨‍⚕️</div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Available Doctors</p>
            <p className="text-2xl font-bold text-gray-800">4</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg text-2xl">🏥</div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Clinic Status</p>
            <p className="text-base font-bold text-green-600">Open Now</p>
          </div>
        </div>
      </div>

      {/* Recent Appointments Preview */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800 text-lg">Upcoming Appointments</h3>
          <Link to="/history" className="text-xs text-blue-600 hover:underline font-semibold">
            See All →
          </Link>
        </div>

        {appointments.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-100 rounded-xl">
            <p className="text-gray-400 text-sm mb-3">No upcoming clinic visits booked yet.</p>
            <Link
              to="/doctors"
              className="inline-block text-xs bg-blue-50 text-blue-600 font-semibold px-3 py-2 rounded-lg hover:bg-blue-100 transition"
            >
              Browse Doctors & Book →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.slice(0, 2).map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">{app.doctorName}</h4>
                  <p className="text-xs text-gray-500">
                    🗓️ {app.date} at {app.time} — <span className="italic">{app.reason}</span>
                  </p>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}