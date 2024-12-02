const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getRepository } = require('typeorm');
const { User } = require('./user.entity');

const JWT_SECRET = 'your_secret_key'; // Use an environment variable for security

function AppService() {
  const userRepository = getRepository(User);

  return {
    // Create a new user
    async createUser(userDto) {
      const { username, password, email } = userDto;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save the user
      const user = userRepository.create({ username, password: hashedPassword, email });
      await userRepository.save(user);

      return { message: 'User created successfully', userId: user.id };
    },

    // Get all users
    async getAllUsers() {
      return await userRepository.find();
    },

    // Get a single user by ID
    async getUserById(id) {
      const user = await userRepository.findOne(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    },

    // Update a user by ID
    async updateUser(id, userDto) {
      const { username, email } = userDto;

      const user = await userRepository.findOne(id);
      if (!user) {
        throw new Error('User not found');
      }

      // Update user fields
      user.username = username || user.username;
      user.email = email || user.email;
      await userRepository.save(user);

      return { message: 'User updated successfully', userId: user.id };
    },

    // Delete a user by ID
    async deleteUser(id) {
      const user = await userRepository.findOne(id);
      if (!user) {
        throw new Error('User not found');
      }
      await userRepository.remove(user);

      return { message: 'User deleted successfully' };
    },

    // Login a user
    async loginUser(loginDto) {
      const { username, password } = loginDto;

      const user = await userRepository.findOne({ where: { username } });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      // Generate JWT
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

      return { message: 'Login successful', token };
    },
  };
}

module.exports = { AppService };
