import { Module } from '@nestjs/common';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { Topics } from './topics.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [TopicsController],
  imports: [SequelizeModule.forFeature([Topics])],
  providers: [TopicsService]
})
export class TopicsModule { }
