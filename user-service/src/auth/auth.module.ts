import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { Auth } from './entities/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Auth])],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
