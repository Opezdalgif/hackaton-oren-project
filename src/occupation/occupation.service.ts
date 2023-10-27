import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OccupationEntity } from './entity/occupation.entity';
import { Repository } from 'typeorm';
import { CreateOccupationDto } from './dto/create-occupation.dto';
import { NotFoundError } from 'rxjs';
import { UpdateCompanyDto } from 'src/company/dto/update-company.dto';
import { UpdateOccupationDto } from './dto/update-occupation.dto';

@Injectable()
export class OccupationService {
    private logger = new Logger(`OCCUPATION-SERVICE`)

    constructor(
        @InjectRepository(OccupationEntity)
        private readonly occupationRepository: Repository<OccupationEntity>
    ){}

    async create(dto: CreateOccupationDto) {
        const occupation = await this.occupationRepository.create(dto)

        try {
            await occupation.save()
        } catch(e) {
            this.logger.error(e)
            throw new BadRequestException(`Ошибка создания рода деятельности`)
        }
    }

    async find(occupationId: number) {
        const occupation = await this.occupationRepository.findOne({
            where: {id: occupationId},
            select: {
                id: true,
                name: true
            }
        })

        if(!occupation) {
            throw new NotFoundException(`Такого рода деятельности нету или ранее были удален`)
        }

        return occupation
    }

    async findAll() {
        return this.occupationRepository.find({
            select: {
                id: true,
                name: true
            }
        })
    }

    async update(occupationId: number, dto: UpdateOccupationDto) {
        try {
            const occupation = await this.find(occupationId)

            for(let key in dto) {
                occupation[key] = dto[key]
            }
            
            await occupation.save()
            return occupation
        } catch(e) {
            this.logger.error(e)
            throw new BadRequestException(`Ошибка обновления рода деятельности`)
        }
    } 

    async remove(occupationId: number) {
        const occupation = await this.find(occupationId)

        try {
            await occupation.remove()
        } catch(e) {
            this.logger.error(e)
            throw new BadRequestException(`Ошибка удаления рода деятельности`)
        }
    }
}
