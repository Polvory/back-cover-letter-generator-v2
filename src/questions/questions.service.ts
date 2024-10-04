import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createLetter } from './dto/questions.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Question } from './question.model';

@Injectable()
export class QuestionsService {

    constructor(
        @InjectModel(Question) private QuestionRepository: typeof Question
    ) { }
    async create(dto: createLetter) {
        let newQuestion = await this.QuestionRepository.create(dto)
        return newQuestion
    }

    async getById(id: string) {
        let questions = await this.QuestionRepository.findAll({ where: { topicId: id } });

        if (questions.length === 0) {
            throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
        }

        // Генерация случайного индекса
        let randomIndex = Math.floor(Math.random() * questions.length);

        // Возврат случайного вопроса
        return questions[randomIndex];
    }

    async getQuestion(userId: string, topicId: string) {
        // return topicId
        return await this.getById(topicId)
    }

    async getAll() {
        return await this.QuestionRepository.findAll()
    }
}
