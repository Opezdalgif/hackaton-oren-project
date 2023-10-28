import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestEntity } from '../enities/test.entity';
import { Repository } from 'typeorm';
import { CreateTestDto } from '../dto/create-test.dto';
import { WhereTestDto } from '../dto/where-test.dto';
import { UpdateTestDto } from '../dto/update-test.dto';
import { QuestionsService } from '../questions/questions.service';

@Injectable()
export class TestService {
    private logger = new Logger(`TEST-SERVICE`)

    constructor(
        @InjectRepository(TestEntity)
        private readonly testRepository: Repository<TestEntity>,
        private readonly questionService: QuestionsService
    ){}

    async create(dto: CreateTestDto, companyId: number) {
        const test = await this.testRepository.create({
            name: dto.name,
            companyId: companyId
        })

        try {
            await test.save()
            for(let i = 0; i < dto.questions.length; i++) {
                await this.questionService.create({
                    question: dto.questions[i].question,
                    answers: dto.questions[i].answers,
                    testId: test.id
                })
            }
        } catch(e) {
            this.logger.error(e)
            throw new BadRequestException(`Ошибка создания теста`)
        }
    }

    async find(dto: WhereTestDto) {
        const test = await this.testRepository.findOne({
            where: dto,
            select: {
                id: true,
                name: true,
            },
            relations: {
                company: true,
                questions: {
                    answer: true
                }
            }
        })

        if(!test) {
            throw new NotFoundException(`Данный тест не найден или ранее был удален`)
        }

        return test
    }

    async findAll() {
        return this.testRepository.find({
            select: {
                id: true,
                name: true,
            },
            relations: {
                company: true,
                questions: {
                    answer: true
                }
            }
        })
    }

    async update(testId: number, dto: UpdateTestDto) {
        try {
            const test = await this.find({testId: testId})

            for(let key in dto) {
                test[key] = dto[key]
            }
            
            await test.save()
            return test
        } catch(e) {
            this.logger.error(e)
            throw new BadRequestException(`Ошибка обновления теста`)
        }
    }

    async remove (testId: number) {
        const test = await this.find({testId: testId})

        try {
            await test.remove()
        } catch(e) {
            this.logger.error(e)
            throw new BadRequestException(`Ошибка удаления теста`)
        }
    }
}   
