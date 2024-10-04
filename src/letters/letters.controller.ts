import { Body, Controller, Get, HttpException, HttpStatus, Logger, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LettersService } from './letters.service';
import { createLetter } from './dto/letter.dto';
import { UsersService } from '../users/users.service'

@ApiTags('letters')
@Controller('letters')
export class LettersController {
    constructor(
        private UsersService: UsersService,
        private LettersService: LettersService
    ) { }
    private readonly logger = new Logger(LettersController.name)

    @ApiOperation({ summary: 'Сгенерировать письмо' })
    @ApiResponse({ status: 200 })
    @Post('/generate')
    async generateLetters(@Body() dto: createLetter) {

        try {
            this.logger.log(`Сгенерировать письмо: ${dto.user_tg_id}`)
            const validateUser = await this.UsersService.validate(dto.user_tg_id)
            if (!validateUser) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
            const newLetter = await this.LettersService.generateLetters(dto)
            validateUser.$add('letters', newLetter.id)
            await validateUser.save()
            this.logger.log('Добавили письмо к юзеру')
            return newLetter
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_GATEWAY);
        }
    }

    @ApiOperation({ summary: 'Получить все писма по юзеру' })
    @ApiResponse({ status: 200 })
    @Get('/get/user')
    async getAllUsersLetters(@Query('user_tg_id') user_tg_id: string) {

        try {
            this.logger.log(`Получить все писма по юзеру: ${user_tg_id}`)
            const validateUser = await this.UsersService.validate(user_tg_id)
            if (!validateUser) throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
            const userletters: any = await this.UsersService.getAllLetters(validateUser.id)
            if (userletters) {
                return userletters

            }
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_GATEWAY);
        }
    }
}
