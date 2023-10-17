import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseFilters
} from "@nestjs/common";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {  Order } from "@prisma/client";
import { OrderService } from "./order.service";
import { OrderDto } from "./dto/order.dto";
import {HttpExceptionFilter} from "../http-exception.filter";

@ApiTags("Order")
@Controller("order")
@UseFilters(new HttpExceptionFilter())
export class OrderController {
    constructor(private readonly orderService: OrderService) {
    }

    @ApiOperation({
        summary: "Create order"
    })
    @ApiResponse({
        status: 201,
        description: 'The order has been successfully created.'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden.'
    })
    @ApiBody({
        type: OrderDto
    })
    @Post("create")
    async createReview(@Body() CreateOrderDto: OrderDto): Promise<Order> {
        try{
            return await this.orderService.create(CreateOrderDto);
        }
        catch (error){
            throw new BadRequestException();
        }
    }

    @ApiOperation({
        summary: "Delete order"
    })
    @ApiParam({ name: 'id', type: 'number' })
    @ApiResponse({
        status: 200,
        description: 'The order has been successfully deleted.'
    })
    @ApiResponse({
        status: 400,
        description: 'There is no order with this ID'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden.'
    })
    @Delete(":id")
    async deleteOrder(@Param("id", ParseIntPipe) id: number):
        Promise<void> {
        try{
            return await this.orderService.delete(id);
        }
        catch (error){
            throw new BadRequestException();
        }
    }

    @ApiOperation({
        summary: "Read order"
    })
    @ApiParam({ name: 'id', type: 'number' })
    @ApiResponse({
        status: 200,
        description: 'The order has been successfully received.'
    })
    @ApiResponse({
        status: 400,
        description: 'There is no order with this ID'
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden.'
    })
    @Get(":id")
    async getOrder(@Param("id", ParseIntPipe) id: number):
        Promise<Order> {
        try{
            return await this.orderService.find(id);
        }
        catch (error){
            throw new BadRequestException();
        }
    }
}
