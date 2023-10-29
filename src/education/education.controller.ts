import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './enities/dto/create-education.dto';
import { JwtPayloadParam } from 'src/common/decorators/jwt-payload.decorator';
import { JwtPayload } from 'src/common/types/JwtPayload.types';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AccountRoleEnum } from 'src/common/enums/account-role.enum';
import { UpdateEdicationDto } from './enities/dto/update-education.dto';

@Controller('education')
@UseGuards(AccessTokenGuard)
@UsePipes(ValidationPipe)
export class EducationController {
    constructor(
        private readonly educationService: EducationService
    ){}

    @Roles(AccountRoleEnum.Admin, AccountRoleEnum.AdminPortal, AccountRoleEnum.HRMeneger, AccountRoleEnum.HRMeneger)
    @Post('create')
    create(@Body() dto: CreateEducationDto, @JwtPayloadParam() jwtPayload: JwtPayload) {
        return this.educationService.create(dto, jwtPayload.userId, jwtPayload.companyId)
    }

    @Get('find/:educationId')
    find(@Param('educationId') educationId: number, @JwtPayloadParam() jwtPayload: JwtPayload) {
        return this.educationService.find(educationId, jwtPayload.companyId, jwtPayload.roleCompany)
    }

    @Get('findAll')
    findAll(@JwtPayloadParam() jwtPayload: JwtPayload) {
        return this.educationService.findAll(jwtPayload.companyId,jwtPayload.roleCompany)
    }

    @Roles(AccountRoleEnum.Admin, AccountRoleEnum.AdminPortal, AccountRoleEnum.HRMeneger, AccountRoleEnum.HRMeneger)
    @Patch('update/:educationId')
    update(@Param('educationId') educationId: number, dto: UpdateEdicationDto) {
        return this.educationService.update(dto, educationId)
    }

    @Roles(AccountRoleEnum.Admin, AccountRoleEnum.AdminPortal, AccountRoleEnum.HRMeneger, AccountRoleEnum.HRMeneger)
    @Delete('remove/:educationId')
    remove(@Param('educationId') educationId: number) {
        return this.educationService.remove(educationId)
    }
}
