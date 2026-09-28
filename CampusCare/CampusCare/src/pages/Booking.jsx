import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAppointmentStore } from '../appointments/appointmentStore';
import { useAuthStore } from '../auth/authStore';

export default function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const doctorId = searchParams.get('doctorId') || '1';
  const doctorName = searchParams.get('doctorName') || 'Dr. Abebe Bikila';

  const appointments = useAppointmentStore((state) => state.appointments);
  const addAppointment = useAppointmentStore((state) => state.addAppointment);
  const { isLoggedIn, user } = useAuthStore();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('09:00 AM');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');

  if (!isLoggedIn) {
    return <p className="text-center py-10 text-gray-500">Please sign in to book an appointment.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!date || !reason) {
      setError('Please select a date and enter a reason for your visit.');
      return;
    }

    // 🛑 CONFLICT CHECKING LOGIC
    // Check if the selected doctor already has an appointment at the same date and time slot
    const isSlotTaken = appointments.some(
      (app) => app.doctorId === doctorId && app.date === date && app.time === time
    );

    if (isSlotTaken) {
      setError(`Dr. ${doctorName.split(' ')[1] || doctorName} is already booked at ${time} on ${date}. Please choose a different time slot or date.`);
      return;
    }

    // Add appointment if no conflict exists
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
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-1">Book Appointment</h2>
      <p className="text-xs text-gray-500 mb-5">
        Doctor: <strong className="text-gray-700">{doctorName}</strong>
      </p>

      {error && (
        <p className="text-xs text-red-600 mb-4 bg-red-50 p-3 rounded-lg border border-red-100 font-medium">
          ⚠️ {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Appointment Date</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Preferred Time Slot</label>
          <select
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 bg-white"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option value="09:00 AM">09:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="02:00 PM">02:00 PM</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">Reason for Visit</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500"
            rows="3"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="e.g. Routine checkup, Fever, Allergy"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-lg shadow-sm transition"
        >
          Confirm & Book Appointment
        </button>
      </form>
    </div>
  );
}