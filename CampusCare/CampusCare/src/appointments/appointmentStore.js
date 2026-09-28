import { create } from 'zustand';

export const useAppointmentStore = create((set) => ({
  appointments: [],

  addAppointment: (newBooking) =>
    set((state) => ({
      appointments: [...state.appointments, { id: Date.now().toString(), rating: 0, ...newBooking }],
    })),

  rateAppointment: (appointmentId, ratingValue) =>
    set((state) => ({
      appointments: state.appointments.map((app) =>
        app.id === appointmentId ? { ...app, rating: ratingValue } : app
      ),
    })),
}));