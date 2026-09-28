import { useAppointmentStore } from '../appointments/appointmentStore';
import { useAuthStore } from '../auth/authStore';

export default function DoctorDashboard() {
  const { user } = useAuthStore();
  const appointments = useAppointmentStore((state) => state.appointments);

  // Filter appointments specifically scheduled for this doctor
  const doctorAppointments = appointments.filter(
    (app) => app.doctorId === user?.doctorId || app.doctorName === user?.name
  );

  return (
    <div className="space-y-6">
      {/* Doctor Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-6 shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <span className="bg-emerald-800 bg-opacity-40 text-emerald-100 text-xs font-semibold px-2.5 py-1 rounded-md uppercase tracking-wide">
              Doctor Clinical Portal
            </span>
            <h2 className="text-2xl font-bold mt-2">{user?.name}</h2>
            <p className="text-teal-100 text-xs mt-1">General Medicine Department • ID: {user?.id}</p>
          </div>
          <div className="text-4xl hidden sm:block">🩺</div>
        </div>
      </div>

      {/* Doctor Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg text-2xl">📋</div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Assigned Patient Consults</p>
            <p className="text-2xl font-bold text-gray-800">{doctorAppointments.length}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg text-2xl">⏳</div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Next Slot Status</p>
            <p className="text-base font-bold text-emerald-600">Active Consultations</p>
          </div>
        </div>
      </div>

      {/* Patient Appointments Schedule */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 text-lg mb-4">Scheduled Patient Appointments</h3>

        {doctorAppointments.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed border-gray-100 rounded-xl">
            <p className="text-gray-400 text-sm">No student appointments scheduled with you yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {doctorAppointments.map((app) => (
              <div key={app.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-800 text-sm">{app.studentName}</span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded">
                      Patient
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    📅 <strong>Date:</strong> {app.date} at {app.time}
                  </p>
                  <p className="text-xs text-gray-600 mt-1 bg-gray-50 p-2 rounded border border-gray-100">
                    📝 <strong>Reason for Visit:</strong> {app.reason}
                  </p>
                </div>
                <div>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                    Confirmed
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}