const { Controller, Get, Post, Body, Param, Delete, Patch } = require('@nestjs/common');
const { UsersService } = require('./users.service');
const { CreateUserDto } = require('./dto/create-user.dto');

@Controller('users')
class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  @Post()
  create(@Body() createUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() updateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.usersService.deleteUser(id);
  }
}

module.exports = UsersController;
