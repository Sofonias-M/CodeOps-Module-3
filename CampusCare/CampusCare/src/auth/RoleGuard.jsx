import { useAuthStore } from './authStore';

export function StudentOnly({ children }) {
  const { user } = useAuthStore();
  
  if (user?.role === 'doctor') {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800">Student Portal View</h3>
        <p className="text-xs text-gray-500 mt-1">You are currently logged in as a Doctor. Switch your role to Student in the top navigation bar to access student booking screens.</p>
      </div>
    );
  }
  
  return children;
}

export function DoctorOnly({ children }) {
  const { user } = useAuthStore();
  
  if (user?.role !== 'doctor') {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-800">Doctor Access Only</h3>
        <p className="text-xs text-gray-500 mt-1">You are logged in as a Student. Switch your role to Doctor in the header menu to view the clinical patient schedule.</p>
      </div>
    );
  }

  return children;
}