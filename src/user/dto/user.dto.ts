import {IsNotEmpty, IsString, IsNumber, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserDto{

    @IsOptional()
    @IsString()
    @ApiProperty()
    name: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    login: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    email: string
}