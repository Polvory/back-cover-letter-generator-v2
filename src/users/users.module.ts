import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from './users.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    providers: [UsersService],
    controllers: [UsersController],
    imports: [
        SequelizeModule.forFeature([Users]),
    ],
    exports: [UsersService]
})

export class UsersModule { }
