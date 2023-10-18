import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get, GoneException,
    Param,
    ParseIntPipe,
    Post,
    UseFilters, UseGuards
} from "@nestjs/common";
import {ApiBasicAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import { Product } from "@prisma/client";
import { ProductService } from "./product.service";
import { ProductDto } from "./dto/product.dto";
import { HttpExceptionFilter } from "../http-exception.filter";
import {AuthGuard} from "../auth/auth.guard";

@ApiTags("Product")
@Controller("product")
@UseFilters(new HttpExceptionFilter())
export class ProductController {
    constructor(private readonly productService: ProductService) {}


    @ApiOperation({
        summary: "Find all product"
    })
    @ApiResponse({
        status: 200,
        description: 'All product has been successfully received.'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden.'
    })
    @Get("/all")
    async getAllProduct():
        Promise<Product[]> {
        try{
            return await this.productService.getAllProd();
        }
        catch (error){
            throw new BadRequestException();
        }
    }

    @ApiOperation({
        summary: "Create product"
    })
    @ApiResponse({
        status: 201,
        description: 'The product has been successfully created.'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden.'
    })
    @ApiBody({
        type: ProductDto
    })
    @Post("create")
    @ApiBasicAuth()
    @UseGuards(new AuthGuard())
    async createProduct(@Body() CreateProductDto: ProductDto): Promise<Product> {
        try{
            return await this.productService.create(CreateProductDto);
        }
        catch (error){
            throw new BadRequestException();
        }
    }

    @ApiOperation({
        summary: "Update product"
    })
    @ApiParam({ name: 'id', type: 'number' })
    @ApiResponse({
        status: 200,
        description: 'The product has been successfully updated.'
    })
    @ApiResponse({
        status: 400,
        description: 'There is no product with this ID'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden.'
    })
    @Post(":id/update")
    @ApiBasicAuth()
    @UseGuards(new AuthGuard())
    async updateProduct(@Param("id", ParseIntPipe) id: number,
                     @Body() ProductDto: ProductDto):
        Promise<Product> {
        try{
            return await this.productService.update(id, ProductDto);
        }
        catch (error){
            throw new BadRequestException();
        }
    }

    @ApiOperation({
        summary: "Delete product"
    })
    @ApiParam({ name: 'id', type: 'number' })
    @ApiResponse({
        status: 200,
        description: 'The product has been successfully deleted.'
    })
    @ApiResponse({
        status: 400,
        description: 'There is no product with this ID'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden.'
    })
    @Delete(":id")
    @ApiBasicAuth()
    @UseGuards(new AuthGuard())
    async deleteProduct(@Param("id", ParseIntPipe) id: number):
        Promise<void> {
        try{
            return await this.productService.delete(id);
        }
        catch (error){
            throw new BadRequestException();
        }
    }

    @ApiOperation({
        summary: "Get product"
    })
    @ApiParam({ name: 'id', type: 'number' })
    @ApiResponse({
        status: 200,
        description: 'The product has been successfully received.'
    })
    @ApiResponse({
        status: 400,
        description: 'There is no product with this ID'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden.'
    })
    @Get(":id")
    async getProduct(@Param("id", ParseIntPipe) id: number):
        Promise<Product> {
        try{
            return await this.productService.find(id);
        }
        catch (error){
            throw new BadRequestException();
        }
    }
}
