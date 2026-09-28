import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: { name: 'Student Sofonias', id: 'RAMS/1042/22', role: 'student' },
  isLoggedIn: true,
  
  login: (role = 'student') => set({
    isLoggedIn: true,
    user: role === 'doctor' 
      ? { name: 'Dr. Abebe Bikila', id: 'DOC-101', role: 'doctor', doctorId: '1' }
      : { name: 'Student Sofonias', id: 'RAMS/1042/22', role: 'student' }
  }),

  switchRole: (role) => set((state) => ({
    user: role === 'doctor'
      ? { name: 'Dr. Abebe Bikila', id: 'DOC-101', role: 'doctor', doctorId: '1' }
      : { name: 'Student Sofonias', id: 'RAMS/1042/22', role: 'student' }
  })),

  logout: () => set({ isLoggedIn: false, user: null }),
}));