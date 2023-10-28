import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TestService } from '../service/test.service';
import { CreateTestDto } from '../dto/create-test.dto';
import { WhereTestDto } from '../dto/where-test.dto';
import { JwtPayloadParam } from 'src/common/decorators/jwt-payload.decorator';
import { JwtPayload } from 'src/common/types/JwtPayload.types';
import { UpdateTestDto } from '../dto/update-test.dto';

@Controller('test')
export class TestController {
    constructor(
        private readonly testService: TestService
    ) {}

    @Post('create')
    create (@Body() dto: CreateTestDto, @JwtPayloadParam() jwtPayload: JwtPayload) {
        return this.testService.create(dto, jwtPayload.сompanyId)
    }

    @Get('find')
    find (@Query() dto: WhereTestDto) {
        return this.testService.find(dto)
    }

    @Get('findAll')
    findAll () {
        return this.testService.findAll()
    }

    @Patch('update/:testId')
    update (@Body() dto: UpdateTestDto, @Param('testId') testId: number) {
        return this.testService.update(testId, dto)
    } 

    @Delete('remove/:testId')
    remove (@Param('testId') testId: number) {
        return this.testService.remove(testId)
    }
}
