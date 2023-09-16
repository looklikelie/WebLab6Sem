import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import {  Product } from "@prisma/client";
import { ProductService } from "./product.service";
import { ProductDto } from "./dto/product.dto";

@ApiResponse({
    status: 501,
    description: "Not implemented"
})

@ApiTags("Product")
@Controller("product")
export class ProductController {
    constructor(private readonly productService: ProductService) {
    }

    @ApiOperation({
        summary: "Create product"
    })
    @ApiBody({
        type: ProductDto
    })
    @Post("create")
    async createReview(@Body() CreateProductDto: ProductDto): Promise<Product> {
        return await this.productService.create(CreateProductDto);
    }

    @ApiOperation({
        summary: "Update product"
    })
    @Post(":id/update")
    async updateProduct(@Param("id", ParseIntPipe) id: number,
                     @Body() ProductDto: ProductDto):
        Promise<Product> {
        return await this.productService.update(id, ProductDto);
    }

    @ApiOperation({
        summary: "Delete product"
    })
    @Delete(":id")
    async deleteProduct(@Param("id") id: number):
        Promise<void> {
        return await this.productService.delete(id);
    }

    @ApiOperation({
        summary: "Read product"
    })
    @Get(":id")
    async getProduct(@Param("id") id: number):
        Promise<Product> {
        return await this.productService.find(id);
    }
}
