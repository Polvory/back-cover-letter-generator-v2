import { ApiProperty } from "@nestjs/swagger";



export class createLetter {
    @ApiProperty({ example: '6935066908', description: 'Текст задания' })
    text: string;

    @ApiProperty({ example: 'Текст сообщения', description: 'Код' })
    code: string;

    @ApiProperty({ example: 'Текст сообщения', description: 'Верный ответ' })
    result: string;

    @ApiProperty({ example: 'Текст сообщения', description: 'Подсказка' })
    hint: string;

    @ApiProperty({ example: 'тип', description: 'JavaScript' })
    type: string;

    @ApiProperty({ example: 'id', description: 'id топика' })
    topicId: string
}