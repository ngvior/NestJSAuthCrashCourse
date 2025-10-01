import { Injectable } from '@nestjs/common'

export type User = {
  id: number;
  username: string;
  password: string;
}
const users: User[] = [
  { id: 1, username: 'john', password: 'changeme' },
  { id: 2, username: 'maria', password: 'guess' },
];

@Injectable()
export class UsersService {
  findByUsername(username: string): User | undefined {
    return users.find((user) => user.username === username);
  }
}
