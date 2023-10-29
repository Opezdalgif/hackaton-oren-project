import { BadGatewayException, BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EducationEntity } from './enities/education.entity';
import { Repository } from 'typeorm';
import { CreateEducationDto } from './enities/dto/create-education.dto';
import { UpdateEdicationDto } from './enities/dto/update-education.dto';

@Injectable()
export class EducationService {
    private logger = new Logger(`EDUTION-SERVICE`)

    constructor(
        @InjectRepository(EducationEntity)
        private readonly educationRepository: Repository<EducationEntity>
    ){}

    async create(dto: CreateEducationDto, userId: number, companyId: number) {
        const education = await this.educationRepository.create({
            name: dto.name,
            description: dto.description,
            userId: userId,
            companyId: companyId
        })

        try {
            await education.save()
        } catch(e) {
            this.logger.error(e)
            throw new BadRequestException(`Произошла ошибка в создании учебного материала`)
        }
    }

    async find(educationId: number) {
        const education = await this.educationRepository.findOne({
            where: {id: educationId},
            relations: {
                 user: true,
                 company: true,
                 documents: true
            }
        })

        if(!education) {
            throw new NotFoundException(`Такого учебного материала нет или ранее был удален`)
        }

        return education
    }

    async findAll(companyId: number) {
        return this.educationRepository.find({
            relations: {
                user: true,
                company: true,
                documents: true
           }
        })
    }

    async update(dto: UpdateEdicationDto, educationId: number) {
        const education = await this.find(educationId)

        for(let key in dto) {
            education[key] = dto[key]
        }

        try {
            await education.save()
        } catch(e) {
            this.logger.error(e)
            throw new BadRequestException(`Ошибка обновления учебного материала`)
        }
    }

    async remove(educationId: number) {
        const education = await this.find(educationId)

        try {
            await education.save()
        } catch(e) {
            this.logger.error(e)
            throw new BadGatewayException(`Произошла ошбика в удалении обучения`)
        }
    }
}
