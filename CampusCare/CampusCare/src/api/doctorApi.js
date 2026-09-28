const MOCK_DOCTORS = [
  {
    id: '1',
    name: 'Dr. Abebe Bikila',
    department: 'General Medicine',
    experience: '8 yrs',
    rating: 4.9,
    reviewCount: 24,
    slots: ['09:00 AM', '11:00 AM', '02:00 PM'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '2',
    name: 'Dr. Sarah Tadesse',
    department: 'Pediatrics',
    experience: '5 yrs',
    rating: 4.7,
    reviewCount: 18,
    slots: ['10:00 AM', '01:00 PM', '04:00 PM'],
    image: 'https://media.istockphoto.com/id/171296819/photo/african-american-female-doctor-holding-a-clipboard-isolated.jpg?s=612x612&w=0&k=20&c=hCJk-9gsOff8Fac04a11VMOwflMYiRXUVfAj3UTn67U='
  },
  {
    id: '3',
    name: 'Dr. Michael Chen',
    department: 'General Medicine',
    experience: '12 yrs',
    rating: 4.8,
    reviewCount: 31,
    slots: ['08:30 AM', '11:30 AM'],
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '4',
    name: 'Dr. Almaz Kebede',
    department: 'Dermatology',
    experience: '6 yrs',
    rating: 4.6,
    reviewCount: 15,
    slots: ['09:30 AM', '02:30 PM'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80'
  }
];

export const fetchDoctorsApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_DOCTORS), 400);
  });
};