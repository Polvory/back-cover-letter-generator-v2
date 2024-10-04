import { Injectable } from '@nestjs/common';
import { createLetter } from './dto/letter.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Letters } from './letters.model';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class LettersService {

    constructor(

        private eventEmitter: EventEmitter2,
        @InjectModel(Letters) private LettersRepository: typeof Letters) { }

    async generateLetters(dto: createLetter) {
        const moaktext = `Привет,

Я - Павел, и я очень заинтересован в вашей вакансии.Я обладаю профессиональными навыками ответственности, трудолюбия, я спортсмен и не употребляю алкоголь.Я также люблю активный отдых и всегда готов к новым вызовам.

Я уверен, что мои навыки и качества отлично подходят для этой позиции.Я обязуюсь быть внимательным и трудолюбивым, запоминать большое количество информации и использовать её в работе.Я также ценю заботу к работнику, уважение и готов принимать различные вкусы и увлечения коллектива.

Буду рад обсудить возможность моего включения в вашу команду более детально.

С уважением,
Павел`

        const newLetter = await this.LettersRepository.create({ text: moaktext, request_text: dto.text })


        return newLetter
    }
}
