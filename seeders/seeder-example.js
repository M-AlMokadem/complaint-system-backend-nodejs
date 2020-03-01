import { Seeder } from 'mongoose-data-seed';
import { User } from '../models/user.model';

const data = [
  {
    email: 'user1@gmail.com',
    password: '123123',
    passwordConfirmation: '123123',
    isAdmin: true
  },
  {
    email: 'user2@gmail.com',
    password: '123123',
    passwordConfirmation: '123123',
    isAdmin: false
  }
];

class UsersSeeder extends Seeder {
  async shouldRun() {
    return User.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return User.create(data);
  }
}

export default UsersSeeder;