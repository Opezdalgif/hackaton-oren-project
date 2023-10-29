import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { RolesCompanyService } from './roles-company.service';
import { CreateRolesCompanyDto } from './dto/roles-company.dto';
import { WhereRolesCompanyDto } from './dto/where-roles-company.dto';
import { JwtPayloadParam } from 'src/common/decorators/jwt-payload.decorator';
import { JwtPayload } from 'src/common/types/JwtPayload.types';
import { UpdateRolesCompanyDto } from './dto/update-roles-company.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AccountRoleEnum } from 'src/common/enums/account-role.enum';

@Controller('roles-company')
@UseGuards(AccessTokenGuard)
@UsePipes(ValidationPipe)
export class RolesCompanyController {
    constructor(
        private readonly rolesCompanyService: RolesCompanyService
    ){}

    //@Roles(AccountRoleEnum.Admin, AccountRoleEnum.AdminPortal, AccountRoleEnum.companyRepresentative)
    @Post('create')
    create(@Body() dto: CreateRolesCompanyDto, @JwtPayloadParam() jwtPayload: JwtPayload) {
        console.log(jwtPayload.companyId)
        return this.rolesCompanyService.create(dto, jwtPayload.companyId)
    }

    @Get('find')
    find(@Query() dto: WhereRolesCompanyDto, @JwtPayloadParam() jwtPayload: JwtPayload) {
        return this.rolesCompanyService.find(dto, jwtPayload.companyId)
    }

    @Get('findAll')
    findAll(@Query() dto: WhereRolesCompanyDto, @JwtPayloadParam() jwtPayload: JwtPayload) {
        return this.rolesCompanyService.findAll(dto, jwtPayload.companyId)
    }

    @Patch('update/:rolesCompanyId')
    update (@Body() dto: UpdateRolesCompanyDto, @Param('rolesCompanyId') rolesCompanyId: number) {
        return this.rolesCompanyService.update(dto,rolesCompanyId)
    } 

    @Delete('remove/:rolesCompanyId')
    remove (@Param('rolesCompanyId') rolesCompanyId: number) {
        return this.rolesCompanyService.remove(rolesCompanyId)
    }
}
