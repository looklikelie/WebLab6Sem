import {IsNotEmpty, IsString, IsNumber, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ProductDto{

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string

    @IsOptional()
    @IsString()
    @ApiProperty()
    content: string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    price: number

    @IsOptional()
    @IsNumber()
    @ApiProperty()
    orderId: number
}