import { IsEmail, MinLength } from "class-validator";

export class CreateUserDto {
    @MinLength(3, { message: 'First name must be more then 3 symbols' })
    firstName: string

    @MinLength(3, { message: 'Last name must be more then 3 symbols' })
    lastName: string

    @IsEmail()
    email: string;

    @MinLength(6, { message: 'Password must be more then 6 symbols' })
    password: string
}
