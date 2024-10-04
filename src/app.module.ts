import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { BotModule } from './bot/bot.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LettersModule } from './letters/letters.module';
import { QuestionsModule } from './questions/questions.module';
import { TopicsModule } from './topics/topics.module';

@Module({
  imports: [EventEmitterModule.forRoot(), // Подключаем модуль событий
    DbModule, UsersModule, BotModule, LettersModule, QuestionsModule, TopicsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
