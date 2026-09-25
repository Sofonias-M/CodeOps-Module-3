import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: { name: 'Student Sofonias', id: 'RAMS/1042/22' },
  isLoggedIn: true,
  login: () => set({ isLoggedIn: true, user: { name: 'Student Sofonias', id: 'RAMS/1042/22' } }),
  logout: () => set({ isLoggedIn: false, user: null }),
}));