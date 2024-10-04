import { ApiProperty } from "@nestjs/swagger";



export class createLetter {
    @ApiProperty({ example: '6935066908', description: 'телеграмм id' })
    user_tg_id: string;

    @ApiProperty({ example: 'Текст сообщения', description: 'Текст сообщения' })
    text: string;
}

