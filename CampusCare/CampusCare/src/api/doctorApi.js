const MOCK_DOCTORS = [
  { id: '1', name: 'Dr. Abebe Bikila', department: 'General Medicine', experience: '8 yrs', slots: ['09:00 AM', '11:00 AM', '02:00 PM'] },
  { id: '2', name: 'Dr. Sarah Tadesse', department: 'Pediatrics', experience: '5 yrs', slots: ['10:00 AM', '01:00 PM', '04:00 PM'] },
  { id: '3', name: 'Dr. Michael Chen', department: 'General Medicine', experience: '12 yrs', slots: ['08:30 AM', '11:30 AM'] },
  { id: '4', name: 'Dr. Almaz Kebede', department: 'Dermatology', experience: '6 yrs', slots: ['09:30 AM', '02:30 PM'] }
];

export const fetchDoctorsApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_DOCTORS), 400);
  });
};