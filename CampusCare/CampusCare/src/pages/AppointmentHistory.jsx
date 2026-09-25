import { useAppointmentStore } from '../appointments/appointmentStore';
import { Link } from 'react-router-dom';

export default function AppointmentHistory() {
  const appointments = useAppointmentStore((state) => state.appointments);

  return (
    <div>
      <h2>My Scheduled Appointments</h2>
      {appointments.length === 0 ? (
        <div>
          <p>You have no scheduled appointments yet.</p>
          <Link to="/doctors">Find a doctor to book an appointment</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '10px' }}>
          {appointments.map((app) => (
            <div key={app.id} style={{ border: '1px solid #28a745', padding: '15px', borderRadius: '5px', backgroundColor: '#f4fff4' }}>
              <h3>{app.doctorName}</h3>
              <p>📅 <strong>Date:</strong> {app.date} at {app.time}</p>
              <p>📝 <strong>Reason:</strong> {app.reason}</p>
              <span style={{ backgroundColor: '#28a745', color: 'white', padding: '3px 8px', borderRadius: '3px', fontSize: '0.85rem' }}>
                {app.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}