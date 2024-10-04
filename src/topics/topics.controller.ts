import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TopicsService } from './topics.service'
import { createTopics } from './dto/topics.dto';

@ApiTags('topics')
@Controller('topics')
export class TopicsController {

    constructor(
        private TopicsService: TopicsService

    ) { }

    @ApiOperation({ summary: 'Создать топик' })
    @ApiResponse({ status: 201 })
    @Post('/create')
    async create(@Body() dto: createTopics) {
        return await this.TopicsService.create(dto)
    }

    @ApiOperation({ summary: 'Получить c вопрсами' })
    @ApiResponse({ status: 201 })
    @Get('/get/questions')
    async getQuestions(@Query('id') id: string) {
        return await this.TopicsService.getQuestions(id)
    }

    @ApiOperation({ summary: 'Получить все топики' })
    @ApiResponse({ status: 201 })
    @Get('/get/all')
    async getAll() {
        return await this.TopicsService.getAll()
    }

    @ApiOperation({ summary: 'Получить по id' })
    @ApiResponse({ status: 201 })
    @Get('/get/byid')
    getById(@Query('id') id: string) {
        return id
    }

    @ApiOperation({ summary: 'Редактировать топик' })
    @ApiResponse({ status: 201 })
    @Put('/edit')
    edite(@Body() dto: createTopics) {
        return dto
    }

}
