import { Injectable } from '@nestjs/common';
import { createTopics } from './dto/topics.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Topics } from './topics.model';
import { Question } from '../questions/question.model';

@Injectable()
export class TopicsService {

    constructor(
        @InjectModel(Topics) private TopicsRepository: typeof Topics
    ) { }


    async create(dto: createTopics) {

        return await this.TopicsRepository.create(dto)
    }

    async getQuestions(id: string) {
        return await this.TopicsRepository.findByPk(id, { include: [Question] })
    }

    async getAll() {
        return await this.TopicsRepository.findAll({ include: [Question] })
    }

    getById() {

    }
}
