import User, { UserEntity } from '../models/user';

const usersData: UserEntity[] = [
  {
    id: 'eb5a26af-6e4c-4f31-a9b1-3450d42ac66c',
  },
  {
    id: '2eb5a26af-6e4c-4f31-a9b1-3450d42ac66d',
  },
  {
    id: '2eb5a26af-6e4c-4f31-a9b1-3450d42ac66c',
  },
];

export async function seedUser() {
  
  const count = await User.countDocuments();

  if (count === 0) {
    await User.insertMany(usersData);
    console.log('Database has been seeded with User!');
  }
}
