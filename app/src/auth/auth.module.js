const { Module } = require('@nestjs/common');
const { AuthService } = require('./auth.service');
const { JwtStrategy } = require('./jwt.strategy');
const { UsersModule } = require('../users/users.module');
const { JwtModule } = require('@nestjs/jwt');

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'your-secret-key',  // Replace with a strong key
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
class AuthModule {}

module.exports = AuthModule;
