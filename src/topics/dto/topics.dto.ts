import { ApiProperty } from "@nestjs/swagger";


export class createTopics {

    @ApiProperty({ example: 'JS', description: 'Код' })
    header: string;

    @ApiProperty({ example: 'JS', description: 'Верный ответ' })
    description: string;

    @ApiProperty({ example: '//', description: 'Подсказка' })
    image: string;


}