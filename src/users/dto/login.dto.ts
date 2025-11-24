import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginDto {

    @IsNotEmpty({ message: 'email should not be empty' })
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsNotEmpty({ message: 'password should not be empty' })
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    password: string;
}
