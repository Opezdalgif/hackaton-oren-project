import { BadGatewayException, BadRequestException, ForbiddenException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesCompanyEntity } from './enities/roles.company.entity';
import { Repository } from 'typeorm';
import { CreateRolesCompanyDto } from './dto/roles-company.dto';
import { WhereRolesCompanyDto } from './dto/where-roles-company.dto';
import { UpdateRolesCompanyDto } from './dto/update-roles-company.dto';

@Injectable()
export class RolesCompanyService {
    private logger = new Logger(`ROLES-COMPANY-SERVICE`)

    constructor(
        @InjectRepository(RolesCompanyEntity)
        private readonly rolesCompanyRepository: Repository<RolesCompanyEntity>
    ) {}

    async create (dto: CreateRolesCompanyDto, companyId: number) {
        const verifyRoleCompany = await this.findCreate({companyId: companyId, nameRole: dto.nameRole}) 
        if(verifyRoleCompany) {
            throw new BadRequestException(`Данная профессия уже создана`)
        }
        const roleCompany = await this.rolesCompanyRepository.create({
            nameRole: dto.nameRole,
            companyId: companyId
        })

        try {
            await roleCompany.save()
        } catch(e) {
            this.logger.error(e)
            throw new BadRequestException(`Ошибка в создании роли организации`)
        }

    }

    async findCreate(dto: WhereRolesCompanyDto) {
        return await this.rolesCompanyRepository.findOne({
            where: dto,
            select: {
                id: true,
                nameRole: true,
                companyId: true
            },
            relations: {
                company: true
            }
        })
    }

    async find(dto: WhereRolesCompanyDto) {

        const roleCompany = await this.rolesCompanyRepository.findOne({
            where: dto,
            select: {
                id: true,
                nameRole: true,
                companyId: true
            },
            relations: {
                company: true
            }
        })
 
        if(!roleCompany) {
            throw new NotFoundException(`Такой роли не существует или ранее была удалена`)
        }

        if(roleCompany.companyId != dto.companyId) {
            throw new ForbiddenException(`У вас нету доступа для просмотра данной информации`)
        }

        return roleCompany
    }

    async findAll(dto: WhereRolesCompanyDto) {
        return this.rolesCompanyRepository.find({
            where: dto,
            select: {
                id: true,
                nameRole: true
            },
            relations: {
                company: true
            }
        })
    }

    async update(dto: UpdateRolesCompanyDto, rolesCompanyId: number) {
        const roleCompany = await this.find({id: rolesCompanyId})

        for(let key in dto) {
            roleCompany[key] = dto[key]
        }

        try {
            await roleCompany.save()
        } catch(e) {
            this.logger.error(e)
            throw new BadRequestException(`Произошла ошибка в обновлении роли предприятия`)
        }
    }

    async remove(rolesCompanyId: number) {
        const roleCompany = await this.find({id: rolesCompanyId})

        try {
            await roleCompany.remove()
        } catch(e) {
            this.logger.error(e)
            throw new BadRequestException(`Произошла ошибка в удалении роли предприятия`)
        }
    }
}
