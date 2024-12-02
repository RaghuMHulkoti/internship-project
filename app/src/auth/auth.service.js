const { Injectable } = require('@nestjs/common');
const { JwtService } = require('@nestjs/jwt');
const { UsersService } = require('../users/users.service');

@Injectable()
class AuthService {
  constructor(usersService, jwtService) {
    this.usersService = usersService;
    this.jwtService = jwtService;
  }

  async validateUser(username, password) {
    const user = await this.usersService.getUserByUsername(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

module.exports = AuthService;
