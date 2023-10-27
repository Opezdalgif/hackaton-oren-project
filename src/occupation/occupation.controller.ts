import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OccupationService } from './occupation.service';
import { CreateOccupationDto } from './dto/create-occupation.dto';
import { UpdateOccupationDto } from './dto/update-occupation.dto';

@Controller('occupation')
export class OccupationController {
    constructor(
        private readonly occupationService: OccupationService
    ){}

    @Post('create')
    create (@Body() dto: CreateOccupationDto) {
        return this.occupationService.create(dto)
    }

    @Get('find/:occupationId')
    find (@Param('occupationId') occupationId: number) {
        return this.occupationService.find(occupationId)
    }

    @Get('findAll')
    findAll () {
        return this.occupationService.findAll()
    }

    @Patch('update/:occupationId')
    update (@Body() dto: UpdateOccupationDto, @Param('occupationId') occupationId: number) {
        return this.occupationService.update(occupationId, dto)
    } 

    @Delete('remove/:occupationId')
    remove (@Param('occupationId') occupationId: number) {
        return this.occupationService.remove(occupationId)
    }
}
