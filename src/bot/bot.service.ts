import { Injectable, Logger } from '@nestjs/common';
import { Start, Update } from 'nestjs-telegraf';
import { Context, Telegram } from 'telegraf';
import { OnEvent } from '@nestjs/event-emitter';
import { getBotConfig } from '../config/bot.config';
import { UsersService } from '../users/users.service'
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios'

@Update()
@Injectable()
export class BotService {
    private readonly logger = new Logger(BotService.name)
    bot: Telegram
    constructor(
        private UsersService: UsersService
    ) {
        this.bot = new Telegram(getBotConfig().token)
    }

    async downloadPhoto(filePath: string, user_id: string): Promise<void> {
        const token = getBotConfig().token;
        const rootDir = path.resolve(__dirname, '../../');
        const savePath = path.join(rootDir, 'user_images', `${user_id}.jpg`);

        try {
            const response = await axios.get(filePath, {
                responseType: 'stream',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status !== 200) {
                throw new Error(`Failed to download image: ${response.statusText}`);
            }

            return new Promise((resolve, reject) => {
                const writer = fs.createWriteStream(savePath);
                response.data.pipe(writer);
                writer.on('finish', () => {
                    console.log(`Image downloaded and saved as ${user_id}.jpg`);
                    const file: any = `https://code-learn.ru/user_images/${user_id}.jpg`
                    resolve(file);
                });
                writer.on('error', reject);
            });
        } catch (error) {
            console.error(`Error downloading photo for user ${user_id}:`, error);

        }
    }
    // Инциализация пользователя или создание
    @Start()
    async startCommand(ctx: Context) {
        const ctx_data: any = ctx.update
        this.logger.log(ctx_data.message.from.id)
        const validateUser = await this.UsersService.validate(String(ctx_data.message.from.id))
        if (validateUser) {
            ctx.sendMessage(`С возврашенеми!`)
        } else {

            const img_id = await this.getUserPhoto(ctx_data.message.from.id)
            console.log(img_id)
            let img_href = 'https://avatars.githubusercontent.com/u/84640980?v=4'
            try {
                const file = await this.bot.getFileLink(img_id)
                let img_name: any = await this.downloadPhoto(file.href, ctx_data.message.from.id)
                if (img_name) {
                    img_href = img_name
                }
            } catch (error) {
                console.error('У пользователя нет фотографий профиля')
            }
            const pauloud: any = {
                user_tg_id: String(ctx_data.message.from.id),
                user_name: ctx_data.message.from.username,
                user_image: img_href
            }
            this.logger.log(`Создаем пользователя:${ctx_data.message.from.id}`)
            await this.UsersService.create(pauloud)
            ctx.sendMessage(`Добро пожаловть новый пользоваетль`)
        }

    }
    async getUserPhoto(user_id: any) {
        this.logger.log(`Ищем фото пользоваетля: ${user_id}`)
        const userProfilePhotos = await this.bot.getUserProfilePhotos(user_id)
        if (userProfilePhotos.total_count > 0) {
            this.logger.log(`Фото найдено: ${user_id}`)
            // Извлечь идентификатор файла первой фотографии
            const fileId = userProfilePhotos.photos[0][0].file_id;
            return fileId;
        } else {
            this.logger.error(`У пользователя нет фотографий профиля: ${user_id}`)

        }
    }


    @OnEvent('gen.code')
    handleSomethingHappenedEvent(payload: any) {
        this.logger.log('Событие перехвачено:', payload);
        this.bot.sendMessage(payload.tg_id, `Ваш код ${payload.code}`)
    }
}
