const { Controller, Post, Get, Put, Delete, Body, Param, Req, UseGuards } = require('@nestjs/common');
const { AuthGuard } = require('./auth.guard');
const { AppService } = require('./app.service');

@Controller('users') // Base route for all user-related operations
function AppController(appService) {
  // Dependency injection
  const service = appService;

  return {
    // Create a new user
    @Post()
    async createUser(@Body() userDto) {
      return await service.createUser(userDto);
    },

    // Get all users
    @Get()
    async getAllUsers() {
      return await service.getAllUsers();
    },

    // Get a single user by ID
    @Get(':id')
    async getUserById(@Param('id') id) {
      return await service.getUserById(id);
    },

    // Update a user by ID
    @Put(':id')
    @UseGuards(AuthGuard) // Authentication required
    async updateUser(@Param('id') id, @Body() userDto) {
      return await service.updateUser(id, userDto);
    },

    // Delete a user by ID
    @Delete(':id')
    @UseGuards(AuthGuard) // Authentication required
    async deleteUser(@Param('id') id) {
      return await service.deleteUser(id);
    },

    // Login a user
    @Post('login')
    async loginUser(@Body() loginDto) {
      return await service.loginUser(loginDto);
    },
  };
}

module.exports = {
  AppController,
};
