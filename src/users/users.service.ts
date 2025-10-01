import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async findByUsername(username: string) {
    return await users.find((user) => user.username === username);
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
