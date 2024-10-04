import { Module } from '@nestjs/common';
import { LettersService } from './letters.service';
import { LettersController } from './letters.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Letters } from './letters.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [LettersService],
  imports: [UsersModule, SequelizeModule.forFeature([Letters])],
  controllers: [LettersController]
})
export class LettersModule { }
