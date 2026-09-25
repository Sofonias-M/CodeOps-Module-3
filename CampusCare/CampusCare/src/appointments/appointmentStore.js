import { create } from 'zustand';

export const useAppointmentStore = create((set) => ({
  appointments: [],
  addAppointment: (newBooking) =>
    set((state) => ({
      appointments: [...state.appointments, { id: Date.now().toString(), ...newBooking }],
    })),
}));