import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { EducationService } from './education.service';
import { CreateEducationDto } from './enities/dto/create-education.dto';
import { JwtPayloadParam } from 'src/common/decorators/jwt-payload.decorator';
import { JwtPayload } from 'src/common/types/JwtPayload.types';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';

@Controller('education')
@UseGuards(AccessTokenGuard)
@UsePipes(ValidationPipe)
export class EducationController {
    constructor(
        private readonly educationService: EducationService
    ){}

    @Post('create')
    create(@Body() dto: CreateEducationDto, @JwtPayloadParam() jwtPayload: JwtPayload) {
        return this.educationService.create(dto, jwtPayload.userId, jwtPayload.companyId)
    }

    @Get('find/:educationId')
    find(@Param('educationId') educationId: number) {
        return this.educationService.find(educationId)
    }

    @Get('findAll')
    findAll() {
        return this.educationService.findAll()
    }
}
