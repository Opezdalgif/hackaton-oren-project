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
            companyId: companyId,
            created_at: new Date(),
            roleCompanyId: dto.roleCompanyId 
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

    async find(testId: number, companyId: number, roleCompany?: string, userId?: number) {
        const test = await this.testRepository.findOne({
            where: {
                id: testId,
                companyId: companyId,
                roleCompany : {
                    nameRole: roleCompany
                },
            },
            select: {
                id: true,
                name: true,
            },
            relations: {
                company: true,
                questions: {
                    answer: true
                },
                testResultUser: {
                    questions: {
                        answer: true
                    }
                }
            }
        })

        if(!test) {
            throw new NotFoundException(`Данный тест не найден или ранее был удален`)
        }

        let result
        test.testResultUser.forEach(test =>  {
            if(test.userId == userId) {
                result = test
            }
        })
        
        test.testResultUser = result

        return test
    }

    async findAll(companyId: number, rolesCompany?: string, userId?: number) {
        const test = await  this.testRepository.find({
            where: {
                companyId: companyId,
                roleCompany: {
                    nameRole: rolesCompany
                },
            },
            select: {
                id: true,
                name: true,
            },
            relations: {
                company: true,
                questions: {
                    answer: true
                },
                testResultUser: {
                    questions: {
                        answer: true
                    }
                }
            }
        })

        test.forEach(test => {
            let result;
            test.testResultUser.forEach(testResult => {
                if(testResult.userId == userId) {
                    console.log(test)
                    result = testResult
                }
            })
            test.testResultUser = result
        
            return test
        })


        return test
    }

    async findUserResultTestHomeRole(testId: number, companyId: number, userId: number) {
        const test = await this.testRepository.findOne({
            where: {
                id: testId,
                companyId: companyId,
                testResultUser: {
                    userId: userId
                }
            }, 
            select: {
                id: true,
                name: true
            },
            relations: {
                company: true,
                questions: {
                    answer: true
                },
                testResultUser: {
                    questions: {
                        answer: true
                    }
                }
            }
        })

        if(!test) {
            throw new NotFoundException(`Такого пройденного теста у пользователя нету`)
        }

        return test
    }

    async HomeRoleFind(testId: number, companyId: number, userId?: number) {
            const test = await this.testRepository.findOne({
                where: {
                    id: testId,
                    companyId: companyId,
                },
                select: {
                    id: true,
                    name: true,
                },
                relations: {
                    company: true,
                    questions: {
                        answer: true
                    },
                    testResultUser: {
                        user: true,
                        questions :{
                            answer: true
                        }
                    }
                }
            })
    
            if(!test) {
                throw new NotFoundException(`Данный тест не найден или ранее был удален`)
            }
    
            return test
        
    }

    async homeRoleFindAll( companyId: number) {
        return this.testRepository.find({
            where: {
                companyId: companyId,
            },
            select: {
                id: true,
                name: true,
            },
            relations: {
                company: true,
                questions: {
                    answer: true
                },
                testResultUser: {
                    questions :{
                        answer: true
                    }
                }
            }
        })
    }

    async update(testId: number, dto: UpdateTestDto, companyId: number, rolesCompany: string, ) {
        try {
            const test = await this.find(testId, companyId)

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

    async remove (testId: number, companyId: number, rolesCompany: string) {
        const test = await this.find(testId,companyId)

        try {
            await test.remove()
        } catch(e) {
            this.logger.error(e)
            throw new BadRequestException(`Ошибка удаления теста`)
        }
    }
}   
