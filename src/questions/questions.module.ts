import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Question } from './question.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [QuestionsService],
  imports: [SequelizeModule.forFeature([Question])],
  controllers: [QuestionsController]
})
export class QuestionsModule { }
