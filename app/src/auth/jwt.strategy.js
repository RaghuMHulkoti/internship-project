const { Strategy } = require('passport-jwt');
const { ExtractJwt } = require('passport-jwt');
const { Injectable } = require('@nestjs/common');
const { PassportStrategy } = require('@nestjs/passport');
const { JwtService } = require('@nestjs/jwt');
const { UsersService } = require('../users/users.service');

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(usersService, jwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key',  // Replace with a strong key
    });
    this.usersService = usersService;
    this.jwtService = jwtService;
  }

  async validate(payload) {
    return this.usersService.getUserById(payload.sub);
  }
}

module.exports = JwtStrategy;
