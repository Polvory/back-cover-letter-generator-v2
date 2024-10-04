import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { getBotConfig } from '../config/bot.config';
import { session } from 'telegraf';
import { UsersModule } from 'src/users/users.module';
@Module({
  imports: [
    UsersModule,
    TelegrafModule.forRoot({
      token: getBotConfig().token,
      middlewares: [session()],
    }),
  ],
  providers: [BotService]
})
export class BotModule { }
