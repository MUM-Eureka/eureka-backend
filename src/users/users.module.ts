import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './models/user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AuthModule
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
