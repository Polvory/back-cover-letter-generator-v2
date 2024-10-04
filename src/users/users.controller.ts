import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Logger, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { createUser, editeUser } from './dto/users.dto';



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

    @ApiOperation({ summary: 'Получить пользователей по id' })
    @ApiResponse({ status: 200 })
    @Get('/get/by/id')
    async getUsersgetById(@Query('user_tg_id') user_tg_id: string) {
        this.logger.log(`Получаем пользоваетля id: ${user_tg_id}`)
        return await this.UsersService.getById(user_tg_id);
    }


    @ApiOperation({ summary: 'Заполняем опрос первого входа' })
    @ApiResponse({ status: 201 })
    @Post('/edite/onebording')
    async editeOnebording(@Body() dto: editeUser) {
        this.logger.log(`Заполняем опрос первого входа: ${dto.user_tg_id}`)
        return await this.UsersService.editeOnebording(dto);
    }



    @ApiOperation({ summary: 'Редактировать пользователея' })
    @ApiResponse({ status: 200 })
    @Put('/edite')
    async editeUsersById(@Body() dto: editeUser) {
        return await this.UsersService.editeById(dto);
    }

    @ApiOperation({ summary: 'Выдать премиум' })
    @ApiResponse({ status: 200 })
    @Put('/get/premium')
    async getPremium(@Query('user_tg_id') user_tg_id: string) {
        return await this.UsersService.getPremium(String(user_tg_id));
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
