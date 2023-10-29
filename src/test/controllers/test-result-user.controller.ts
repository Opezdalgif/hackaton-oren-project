import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { TestService } from '../service/test.service';
import { CreateTestDto } from '../dto/create-test.dto';
import { WhereTestDto } from '../dto/where-test.dto';
import { JwtPayloadParam } from 'src/common/decorators/jwt-payload.decorator';
import { JwtPayload } from 'src/common/types/JwtPayload.types';
import { UpdateTestDto } from '../dto/update-test.dto';
import { TestResultUserService } from '../service/test-result-user.service';
import { CreateTestResultUserDto } from '../dto/create-test-result-user.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('test/resultUser')
@UseGuards(AccessTokenGuard)
export class TestResultUserController {
    constructor(
        private readonly testResultUserService: TestResultUserService
    ) {}

    @Post('create')
    create (@Body() dto: CreateTestResultUserDto, @JwtPayloadParam() jwtPayload: JwtPayload) {
        return this.testResultUserService.create(dto, jwtPayload.userId)
    }

    @Get('find/:testResultUserId')
    find (@Param('testResultUserId') testResultUserId: number) {
        return this.testResultUserService.find(testResultUserId)
    }

    @Get('findAll')
    findAll () {
        return this.testResultUserService.findAll()
    }

    // @Patch('update/:testId')
    // update (@Body() dto: UpdateTestDto, @Param('testId') testId: number) {
    //     return this.testService.update(testId, dto)
    // } 

    // @Delete('remove/:testId')
    // remove (@Param('testId') testId: number) {
    //     return this.testService.remove(testId)
    // }
}
