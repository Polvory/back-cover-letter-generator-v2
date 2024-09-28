import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Logger, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { createUser } from './dto/users.dto';



@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(
        private UsersService: UsersService
    ) { }
    private readonly logger = new Logger(UsersController.name)


    @ApiOperation({ summary: 'Получить пользователей' })
    @ApiResponse({ status: 200 })
    @Get('/get')
    async getCardUsers() {
        return await this.UsersService.getAll();
    }


    @ApiOperation({ summary: 'Сгенерировать код' })
    @ApiResponse({ status: 200 })
    @Get('/generateCode')
    async generateCode(@Query('value') value: string) {
        try {
            return await this.UsersService.generateCode(value);
        } catch (error) {
            this.logger.error('Error in generateCode endpoint: ' + error.message);
            throw new InternalServerErrorException('Error generating code');
        }
    }

    @ApiOperation({ summary: 'Проверить код' })
    @ApiResponse({ status: 200 })
    @Put('/validateCode')
    async validateCode(@Query('user_tg_id') user_tg_id: string, @Query('code') code: string) {
        try {
            return await this.UsersService.validateCode(user_tg_id, code);
        } catch (error) {
            this.logger.error('Error fail code: ' + error.message);
            throw new InternalServerErrorException('Fail code');
        }
    }

    @ApiOperation({ summary: 'Создать пользователя' })
    @ApiResponse({ status: 201, description: 'Пользователь успешно создан' })
    @ApiResponse({ status: 400, description: 'Ошибка валидации данных' })
    @Post('/create')
    async getCreateUser(@Body() dto: createUser) {
        try {
            return await this.UsersService.create(dto);
        } catch (error) {
            this.logger.error('Error in creating user: ' + error.message);

            if (error) {
                throw new BadRequestException('Validation failed: ' + error.message);
            }
            throw error;
        }
    }

}
