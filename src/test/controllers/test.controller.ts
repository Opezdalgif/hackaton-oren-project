import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { TestService } from '../service/test.service';
import { CreateTestDto } from '../dto/create-test.dto';
import { WhereTestDto } from '../dto/where-test.dto';
import { JwtPayloadParam } from 'src/common/decorators/jwt-payload.decorator';
import { JwtPayload } from 'src/common/types/JwtPayload.types';
import { UpdateTestDto } from '../dto/update-test.dto';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AccountRoleEnum } from 'src/common/enums/account-role.enum';

@Controller('test')
@UsePipes(ValidationPipe)
@UseGuards(AccessTokenGuard)
export class TestController {
    constructor(
        private readonly testService: TestService
    ) {}

    @Post('create')
    create (@Body() dto: CreateTestDto, @JwtPayloadParam() jwtPayload: JwtPayload) {
        console.log(jwtPayload.companyId)
        return this.testService.create(dto, jwtPayload.companyId)
    }

    @Get('find/:testId')
    find (@Param('testId') testId: number, @JwtPayloadParam() jwtPayload: JwtPayload) {
        return this.testService.find(testId, jwtPayload.companyId, jwtPayload.roleCompany)
    }

    @Get('findAll')
    findAll (@JwtPayloadParam() jwtPayload: JwtPayload) {
        return this.testService.findAll(jwtPayload.companyId, jwtPayload.roleCompany)
    }

    @Roles(AccountRoleEnum.Admin, AccountRoleEnum.AdminPortal, AccountRoleEnum.HRMeneger, AccountRoleEnum.companyRepresentative)
    @Get('findHomeRole/:testId')
    findHomeRole (@Param('testId') testId: number, @JwtPayloadParam() jwtPayload: JwtPayload) {
        return this.testService.HomeRoleFind(testId, jwtPayload.companyId)
    }

    @Roles(AccountRoleEnum.Admin, AccountRoleEnum.AdminPortal, AccountRoleEnum.HRMeneger, AccountRoleEnum.companyRepresentative)
    @Get('findAllHomeRole')
    findAllHomeRole (@JwtPayloadParam() jwtPayload: JwtPayload) {
        return this.testService.homeRoleFindAll(jwtPayload.companyId)
    }

    @Patch('update/:testId')
    update (@Body() dto: UpdateTestDto, @Param('testId') testId: number, @JwtPayloadParam() jwtPayload: JwtPayload) {
        return this.testService.update(testId, dto, jwtPayload.companyId, jwtPayload.roleCompany)
    } 

    @Delete('remove/:testId')
    remove (@Param('testId') testId: number, @JwtPayloadParam() jwtPayload: JwtPayload) {
        return this.testService.remove(testId, jwtPayload.companyId, jwtPayload.roleCompany)
    }
}
