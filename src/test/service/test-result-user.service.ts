import { BadRequestException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TestResultUserEntity } from "../enities/test-result-user.entity";
import { Repository } from "typeorm";
import { CreateTestResultUserDto } from "../dto/create-test-result-user.dto";
import { QuestionsService } from "../questions/questions.service";

@Injectable()
export class TestResultUserService {
    private logger = new Logger(`TEST-RESULT-USER-SERVICE`)
    constructor (
        @InjectRepository(TestResultUserEntity)
        private readonly testResutlUserRepository: Repository<TestResultUserEntity>,
        private readonly questionService: QuestionsService
    ){}

    async create(dto: CreateTestResultUserDto, userId: number) {
        const testResultUser = await this.testResutlUserRepository.create({
            testId: dto.testId,
            userId: userId,   
            created_at: new Date()
        })  

        try {
            await testResultUser.save()
            for(let i = 0; i < dto.questions.length; i++) {
                await this.questionService.create({
                   question: dto.questions[i].question,
                   answers: dto.questions[i].answers,
                   testId: testResultUser.testId,
                   testResultUserId: testResultUser.id
                })
            }
        } catch(e) {
            this.logger.error(e)
            throw new BadRequestException(`Ошибка в создании результата теста пользователя`)
        }
    }

    async find(testResultUserId: number) {
        const testResultUser = await this.testResutlUserRepository.findOne({
            where: {id: testResultUserId},
            select: {
                id: true,
                userId: true,
                testId: true
            }, 
            relations: {
                questions: {
                    answer: true
                },
                test: true,
                user: true
                
            }
        })
        
        if(!testResultUser) {
            throw new NotFoundException(`Вашего ответа нету или ранее был удален`)
        }

        return testResultUser
    }

    async findAll() {
        return this.testResutlUserRepository.find({
            select: {
                id: true,
                userId: true,
                testId: true
            }, 
            relations: {
                questions: {
                    answer: true
                },
                test: true,
                user: true
                
            }
        })
    }
}