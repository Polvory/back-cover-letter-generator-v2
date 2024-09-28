import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Users } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { createUser } from './dto/users.dto';
import * as bcrypt from 'bcrypt'
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
    private saltRounds = 10;
    private readonly logger = new Logger(UsersService.name)

    constructor(
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
