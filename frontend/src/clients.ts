// Mock client data
export interface Client {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  dob: string;
  phone: string;
  email: string;
  image: string;
}

export const clients: Client[] = [
  {
    id: '1',
    userId: 'U001',
    firstName: 'Alice',
    lastName: 'Smith',
    dob: '1990-01-01',
    phone: '555-1234',
    email: 'alice.smith@example.com',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '2',
    userId: 'U002',
    firstName: 'Bob',
    lastName: 'Johnson',
    dob: '1985-05-12',
    phone: '555-5678',
    email: 'bob.johnson@example.com',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: '3',
    userId: 'U003',
    firstName: 'Charlie',
    lastName: 'Lee',
    dob: '1992-09-23',
    phone: '555-8765',
    email: 'charlie.lee@example.com',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];
