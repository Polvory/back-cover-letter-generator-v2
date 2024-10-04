
import { ApiProperty } from "@nestjs/swagger";

export class createUser {
    @ApiProperty({ example: '6935066908', description: 'телеграмм id' })
    user_tg_id: string;

    @ApiProperty({ example: 'polvory', description: 'name' })
    user_name?: string;

    @ApiProperty({ example: 'https://avatars.githubusercontent.com/u/32514592?v=4', description: 'img' })
    user_image?: string;
}

export class editeUser {
    @ApiProperty({ example: '6935066908', description: 'телеграмм id' })
    user_tg_id: string;

    @ApiProperty({ example: 'Павел', description: 'Имя' })
    name?: string;

    @ApiProperty({ example: 'Дизайнер', description: 'Роль' })
    role?: string;

    @ApiProperty({ example: 'Разарботчик', description: 'Описание' })
    description?: string;
}