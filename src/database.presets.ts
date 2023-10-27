import { INestApplication, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { CreateUserDto } from "./users/dto/create-user.dto";
import { UsersService } from "./users/services/users.service";
import { AccountRoleEnum } from "./common/enums/account-role.enum";  

export const DatabasePresets = async (app: INestApplication) => {
    const logger: Logger = new Logger('Database-Presets');

    const configService: ConfigService = app.get<ConfigService>(ConfigService);
    const usersService: UsersService =
        app.get<UsersService>(UsersService);

    const adminAccountData: CreateUserDto = {
        phoneNumber: configService.getOrThrow('ADMIN_PHONE_NUMBER'),
        passwordHash: configService.getOrThrow('ADMIN_PASSWORD'),
        email: configService.getOrThrow('ADMIN_EMAIL'),
    };

    if (
        !(await usersService.find({
            phoneNumber: adminAccountData.phoneNumber,
        }))
    ) {
        await usersService.create(adminAccountData, AccountRoleEnum.Admin);
        logger.log('Автоматическое создание аккаунта администратора успешно!');
        
    }
};
