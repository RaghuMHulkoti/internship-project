const { Injectable } = require('@nestjs/common');
const { InjectRepository } = require('@nestjs/typeorm');
const { Repository } = require('typeorm');
const { User } = require('./users.entity');
const { CreateUserDto } = require('./dto/create-user.dto');

@Injectable()
class UsersService {
  constructor(
    @InjectRepository(User)
    usersRepository
  ) {
    this.usersRepository = usersRepository;
  }

  async createUser(createUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async getAllUsers() {
    return this.usersRepository.find();
  }

  async getUserById(id) {
    return this.usersRepository.findOne(id);
  }

  async updateUser(id, updateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return this.getUserById(id);
  }

  async deleteUser(id) {
    await this.usersRepository.delete(id);
  }
}

module.exports = UsersService;
