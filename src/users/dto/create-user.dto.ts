import { IsNotEmpty , IsString , IsEmail , Length, IsNumber, IsPhoneNumber, IsEnum} from "class-validator";
import { AccountRoleEnum } from "src/common/enums/account-role.enum";

export class CreateUserDto {

    @IsNotEmpty({message: 'Имя должно быть заполнено'})
    @IsString({message: 'Поле имени должно быть строкой'})
    readonly firstName: string;

    @IsNotEmpty({message: 'Фамилия должна быть заполнена'})
    @IsString({message: 'Поле фамилии должно быть строкой'})
    readonly lastName: string;

    @IsNotEmpty({message: 'Поле должно быть заполнено'})
    readonly phoneNumber: string;

    @IsNotEmpty({message: 'Email должен быть заполнен'})
    @IsEmail()
    readonly email: string
    
    @IsNotEmpty({message: 'Поле должно быть заполнено'})
    @IsString({message: 'Поле должно быть строкой'})
    @Length(8, 32 , {message: 'Должно быть от 8 до 32 символов'})
    readonly passwordHash: string;

    @IsEnum(AccountRoleEnum)
    role: AccountRoleEnum
}