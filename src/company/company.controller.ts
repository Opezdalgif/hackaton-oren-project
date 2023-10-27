import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { JwtPayloadParam } from 'src/common/decorators/jwt-payload.decorator';
import { JwtPayload } from 'src/common/types/JwtPayload.types';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AddOccupationDto } from './dto/add-occupation.dto';
import { RemoveOccupationDto } from './dto/remove-occupation.dto';

@Controller('company')
@UseGuards(AccessTokenGuard)
@UsePipes(ValidationPipe)
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService
    ){}

    @Post('create')
    create (@Body() dto: CreateCompanyDto, @JwtPayloadParam() jwtPayload: JwtPayload) {
        return this.companyService.create(dto, jwtPayload.userId)
    }

    @Get('find/:companyId')
    find (@Param('companyId') companyId: number) {
        return this.companyService.find(companyId)
    }

    @Get('findAll')
    findAll () {
        return this.companyService.findAll()
    }

    @Patch('update/:companyId')
    update (@Body() dto: UpdateCompanyDto, @Param('companyId') companyId: number) {
        return this.companyService.update(companyId, dto)
    } 

    @Delete('remove/:companyId')
    remove (@Param('companyId') companyId: number) {
        return this.companyService.remove(companyId)
    }

    @Post('addOccupation')
    addOccupation (@Body() dto: AddOccupationDto) {
        return this.companyService.addOccupation(dto.companyId, dto.occupationId)
    }

    @Post('removeOccupation')
    removeOccupation(@Body() dto: RemoveOccupationDto) {
        return this.companyService.removeOccupation(dto.companyId, dto.occupationId)
    }
}
