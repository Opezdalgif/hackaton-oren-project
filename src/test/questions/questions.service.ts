import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuestionsEntity } from './entites/questions.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { AnswerService } from './answer/answer.service';

@Injectable()
export class QuestionsService {
    private logger = new Logger(`QUESTIONS-SERVICE`)
    constructor(
        @InjectRepository(QuestionsEntity)
        private readonly questionsRepository: Repository<QuestionsEntity>,
        private readonly answerService: AnswerService
    ) {}

    async create(dto: CreateQuestionDto) {
        const question = await this.questionsRepository.create({
            question: dto.question,
            testId: dto.testId ?  dto.testId : undefined,
            testResultUserId: dto.testResultUserId ? dto.testResultUserId : undefined
        })
        
        try {
            await question.save()
            
            for(let i = 0; i < dto.answers.length; i++) {
                await this.answerService.create({
                    text: dto.answers[i].text,
                    isCorrect: dto.answers[i].isCorrect,
                    questionId: question.id,
                    select: dto.answers[i].select
                })
            }
        } catch(e) {
            this.logger.error(e)
            if(e instanceof BadRequestException) {
                throw e
            }
            throw new BadRequestException(`Ошибка создания вопроса для теста`)
        }
        
    }
}
