import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppointmentStore } from '../appointments/appointmentStore';
import { useAuthStore } from '../auth/authStore';

export default function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const doctorId = searchParams.get('doctorId') || '1';
  const doctorName = searchParams.get('doctorName') || 'Dr. Abebe Bikila';

  const addAppointment = useAppointmentStore((state) => state.addAppointment);
  const { isLoggedIn, user } = useAuthStore();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00 AM');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  if (!isLoggedIn) {
    return <p>Please sign in to book an appointment.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !reason) {
      setError('Please select a date and enter a reason for your visit.');
      return;
    }

    addAppointment({
      doctorId,
      doctorName,
      studentName: user.name,
      date,
      time,
      reason,
      status: 'Confirmed'
    });

    navigate('/history');
  };

  return (
    <div style={{ maxWidth: '450px', margin: '0 auto' }}>
      <h2>Book Appointment</h2>
      <p>Booking with: <strong>{doctorName}</strong></p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ display: 'block' }}>Appointment Date:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block' }}>Preferred Time Slot:</label>
          <select value={time} onChange={(e) => setTime(e.target.value)} style={{ width: '100%', padding: '8px' }}>
            <option value="09:00 AM">09:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="02:00 PM">02:00 PM</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block' }}>Reason for Visit:</label>
          <textarea 
            value={reason} 
            onChange={(e) => setReason(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} 
            placeholder="e.g. Routine checkup, Fever, Allergy"
          />
        </div>

        <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Confirm & Book
        </button>
      </form>
    </div>
  );
}