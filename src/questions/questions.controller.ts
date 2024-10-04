import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createLetter } from './dto/questions.dto';
import { QuestionsService } from './questions.service'

@ApiTags('questions')
@Controller('questions')
export class QuestionsController {

    constructor(
        private QuestionsService: QuestionsService
    ) { }
    private readonly logger = new Logger(QuestionsController.name)

    @ApiOperation({ summary: 'Создать вопрос' })
    @ApiResponse({ status: 200 })
    @Post('/create')
    async create(@Body() dto: createLetter) {
        return this.QuestionsService.create(dto)
    }

    @ApiOperation({ summary: 'Получить все' })
    @ApiResponse({ status: 200 })
    @Get('/get/all')
    async getAll() {
        return this.QuestionsService.getAll()
    }

    @ApiOperation({ summary: 'Получить по id топика и юзера' })
    @ApiResponse({ status: 200 })
    @Get('/get/question')
    async getQuestion(@Query('userId') userId: string, @Query('topicId') topicId: string) {
        return await this.QuestionsService.getQuestion(userId, topicId);
    }
}
