import { BadGatewayException, BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerEntity } from './enities/answer.entity';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswerService {
    private logger = new Logger(`ANSWER-SERVICE`)

    constructor(
        @InjectRepository(AnswerEntity)
        private readonly answerRepository: Repository<AnswerEntity>
    ){}

    async create(dto: CreateAnswerDto) {
        const answer = await this.answerRepository.create(dto)

        try {
            await answer.save()
        } catch(e) {
            this.logger.error(e)
            throw new BadRequestException(`Произошла ошибка в создании ответа на вопрос`)
        }
        
    }   
}
