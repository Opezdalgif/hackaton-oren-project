import { BadRequestException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { FilesService } from 'src/files/files.service';
import { UsersService } from 'src/users/services/users.service';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { OccupationService } from 'src/occupation/occupation.service';


@Injectable()
export class CompanyService {
    private logger = new Logger(`COMPANY-SERVICE`)

    constructor(
        @InjectRepository(CompanyEntity)
        private readonly companyRepository: Repository<CompanyEntity>,
        private readonly filesService: FilesService,
        private readonly userService: UsersService,
        private readonly occupationService: OccupationService
    ){}

    async create (dto: CreateCompanyDto, userId: number) {
        const userAddCompany = await this.userService.find({id: userId})

        if(userAddCompany.companyId) {
            throw new BadRequestException(`У вас уже есть предприятие. Можно создать только одно предприятие`)
        }
        const icon = await this.filesService.uploadFileBase64(
            dto.icon,
            'photo'
        )

        const company = await this.companyRepository.create({
            name: dto.name,
        })

        try {
            if(icon) {
                company.icon = icon.publicPath
                await company.save()
            }
            await company.save()
            userAddCompany.companyId = company.id
            await userAddCompany.save()
        } catch(e) {
            this.logger.error(e)
            throw new BadRequestException(`Произошла ошибка в создании организации`)
        }

        return company
    }

    async find(companyId: number) {
        const company = await this.companyRepository.findOne({
            where: {id: companyId},
            select: {
                id: true,
                name: true,
                icon: true
            },
            relations: {
                occupation: true,
                test: true,
                users: true
            }
        })

        if(!company) {
            throw new NotFoundException(`Данной компании нету или ранее была удалена`)
        }

        return company
    }

    async findAll() {
        return this.companyRepository.find({
            select: {
                id: true,
                name: true,
            },
            relations: {
                users: true,
                test: true
            }
        })
    }

    async update(companyId: number, dto:UpdateCompanyDto) {
        try{
            const company = await this.find(companyId)

            const uploadedImage = await this.filesService.uploadFileBase64(
                dto.icon,
                'photo',
            );

            for(let key in dto) {
                company[key] = dto[key]
            }
            
            company.icon = uploadedImage.publicPath
            await company.save()
            return company
        } catch(e) {
            this.logger.error(e)
            throw new BadRequestException(`Ошибка обновления предприятия`)
        }
    }

    async remove(companyId: number) {
        const company = await this.find(companyId)

        try {
            await company.remove()
        } catch(e) {
            this.logger.error(e)
            throw new BadRequestException(`Ошибка удаления предпрятия`)
        }
    }

    async addOccupation(companyId: number, occupationId: number) {
        const company = await this.find(companyId);
        const occupation = await this.occupationService.find(occupationId);
    
        if (!company.occupation) {
            company.occupation = [];
        }
    
        company.occupation.push(occupation);
    
        try {
            await this.companyRepository.save(company);
        } catch (e) {
            this.logger.log(e);
            throw new BadRequestException(`Ошибка в добавлении рода деятельности`);
        }
    }

    async removeOccupation(companyId: number, occupationId: number) {
        const company = await this.find(companyId);
        const occupation = await this.occupationService.find(occupationId);

        let copyArr = company.occupation.filter(occ => occ.id !== occupation.id)
       
        try {
            company.occupation = copyArr
            await company.save()
        } catch(e) {
            this.logger.log(e)
            throw new BadRequestException(`Ошибка в удаление услуги`)
        }
    }
}
