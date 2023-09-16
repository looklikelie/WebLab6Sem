import {IsNotEmpty, IsString, IsNumber, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ReviewDto{

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    text: string

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    userId: number
}