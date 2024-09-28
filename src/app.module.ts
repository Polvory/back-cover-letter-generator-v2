import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';


@Module({
  imports: [DbModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
