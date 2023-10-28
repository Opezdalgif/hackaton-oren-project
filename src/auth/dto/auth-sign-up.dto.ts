import {
    IsDateString,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    MinLength,
} from 'class-validator';

export class AuthSignUpDto {
  
    @IsNotEmpty({message: 'Имя должно быть заполнено'})
    @IsString({message: 'Поле имени должно быть строкой'})
    readonly firstName: string;

    @IsNotEmpty({message: 'Фамилия должна быть заполнена'})
    @IsString({message: 'Поле фамилии должно быть строкой'})
    readonly lastName: string;
    
    @IsNotEmpty({message:'Номер телефона должен быть заполнен'})
    @IsString()
    @Length(1, 11)
    readonly phoneNumber: string;

    @IsNotEmpty({message:'Email должен быть заполнен'})
    @IsEmail()
    readonly email: string

    @IsString()
    @MinLength(6)
    readonly password: string;
}
