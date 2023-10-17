import {IsNotEmpty, IsString, IsNumber, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class OrderDto{

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    userId: number
}