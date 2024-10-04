import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Users } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { createUser, editeUser } from './dto/users.dto';
import * as bcrypt from 'bcrypt'
import { Op } from 'sequelize';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Letters } from '../letters/letters.model';
@Injectable()
export class UsersService {
    private saltRounds = 10;
    private readonly logger = new Logger(UsersService.name)

    constructor(
        private eventEmitter: EventEmitter2,
        @InjectModel(Users) private UsersRepository: typeof Users,
    ) { }

    async getAll() {
        try {
            const users = await this.UsersRepository.findAll()
            return users;
        } catch (error) {
            // Логируем и пробрасываем общие ошибки
            this.logger.error('Error get user: ' + error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async getAllLetters(id: string) {
        try {
            const users: any = await this.UsersRepository.findOne({
                where: { id: id }, include: [{
                    model: Letters,
                    as: 'letters' // Используйте псевдоним, если он указан в ассоциации
                }]
            })
            if (users) {
                return users.letters;
            }

        } catch (error) {
            // Логируем и пробрасываем общие ошибки
            this.logger.error('Error get user: ' + error.message);
            throw new InternalServerErrorException(error.message);
        }
    }


    async editeOnebording(dto: editeUser) {
        try {
            let validate_user = await this.validate(dto.user_tg_id)
            if (!validate_user) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
            validate_user.name = dto.name
            validate_user.description = dto.description
            validate_user.role = dto.role
            validate_user.onebording = true
            return await validate_user.save()
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_GATEWAY);
        }


    }

    async getById(user_tg_id: string) {
        try {
            const user = await this.UsersRepository.findOne({ where: { user_tg_id: user_tg_id } })
            this.logger.log(user)
            return user ? user : null;
        } catch (error) {
            // Логируем и пробрасываем общие ошибки
            this.logger.error('Error get user: ' + error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    async getPremium(user_tg_id: string) {
        try {
            this.logger.log(`Добавляем премиум: ${user_tg_id}`)
            let user: any = await this.validate(String(user_tg_id))
            // return user
            if (user === null) {
                throw new InternalServerErrorException('User not found');
            } else {
                const date = new Date()
                date.setDate(date.getDate() + 30)
                this.logger.log(date.getTime())
                user.requests_date = String(date.getTime())
                user.premium = true
                let newDataUser = await user.save()
                return newDataUser
            }
        } catch (error) {
            this.logger.log(error)
        }

    }

    async editeById(dto: editeUser) {
        try {
            const user = await this.validate(dto.user_tg_id);
            if (user === null) {
                return new InternalServerErrorException('User not found');
            }

            user.name = dto.name
            user.description = dto.description
            let newDataUser = await user.save()
            return newDataUser

        } catch (error) {
            this.logger.error('Error generating code: ' + error.message);
            throw new InternalServerErrorException('Failed toedite user' + error.message);
        }

    }
    generateFourDigitCode() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    async validate(value: string): Promise<Users | null> {
        // Логика валидации пользователя
        const user = await this.UsersRepository.findOne({
            where: {
                [Op.or]: [
                    { user_tg_id: value },
                    { user_name: value }
                ]
            }
        });
        return user ? user : null;
    }

    async validateCode(user_tg_id: string, code: string) {
        const user = await this.validate(user_tg_id);
        if (!user) {

            throw new InternalServerErrorException('User does not exist or validation failed');
        }
        const match = await bcrypt.compare(code, user.one_time_code);
        return match
    }

    async generateCode(value: string) {
        try {
            const user = await this.validate(value);
            if (!user) {
                throw new InternalServerErrorException('User does not exist or validation failed');
            }
            const code = this.generateFourDigitCode();
            const code_hash = await bcrypt.hash(String(code), this.saltRounds);
            user.one_time_code = code_hash;
            // Публикуем событие "something.happened"
            this.eventEmitter.emit('gen.code', { tg_id: user.user_tg_id, code: code });
            this.logger.log(`code:${code}`)
            await user.save();
            return { message: 'Code sent successfully' };
        } catch (error) {
            this.logger.error('Error generating code: ' + error.message);
            throw new InternalServerErrorException('Failed to generate code');
        }

    }

    async create(dto: createUser) {
        try {
            const user = await this.UsersRepository.create(dto);
            return user;
        } catch (error) {
            // Логируем и пробрасываем общие ошибки
            this.logger.error('Error creating user: ' + error.message);
            throw new InternalServerErrorException(error.message);
        }
    }
}
